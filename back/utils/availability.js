import sequelize from "../config/database.mjs"
import Availability from "../models/Availability.mjs"
import Rides from "../models/Rides.mjs"

import { Op } from "sequelize"

export function setAvailabilityConfig (type = null) {
  let now = new Date()
  let today_start = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  let today_end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  today_end.setMilliseconds(today_end.getMilliseconds() - 1)

  if (type && type.startsWith("month_")) {
    let month_position = parseInt(type.split('_')[1])
    return {
      start: new Date(now.getFullYear(), month_position, 1),
      end: new Date(now.getFullYear(), month_position + 1, 0)
    }
  } else if (type && ['week', 'week2'].includes(type)){
    return getAvailabilityConfig(today_start, today_end)[type]
  } else {
    return getAvailabilityConfig(today_start, today_end)['today']
  }
}

export let getAvailabilityConfig = (today_start, today_end) => {
  return {
    week: {
      start: today_start,
      end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    week2: {
      start: today_start,
      end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    },
    today: {
      start: today_start,
      end: today_end
    }
  }
}

export async function updateAvailability(availability, chofer_id) {
  let availability_edit = await sequelize.transaction();

  try {
    let errors = [];
    let ids = availability.map(time_range => Number(time_range.id));

    let availabilities = await Availability.findAll({
      where: {
        id: {
          [Op.in]: ids
        },
        chofer_id: chofer_id
      }
    });

    for (let index = 0; index < availability.length; index++) {
      let time_range = availability[index];
      let currentAvailability = availabilities.find(av => av.id === Number(time_range.id)).dataValues;

      let availability_date = new Date(currentAvailability.date);
      let chofer_reservations = await Rides.count({
        where: {
          chofer_id: chofer_id,
          date: availability_date,
          hour: {
            [Op.between]: [currentAvailability.start_time, currentAvailability.end_time]
          }
        }
      });

      if (chofer_reservations > 0) {
        errors.push({
          path: ['timeslot', index],
          message: "Une reservation est organisée sur cette plage horaire."
        });
      } else {
        await Availability.update({
          start_time: time_range.start,
          end_time: time_range.end
        }, {
          where: {
            id: Number(time_range.id),
            chofer_id: chofer_id
          },
          transaction: availability_edit
        });
      }
    }

    await availability_edit.commit();

    if (errors.length > 0) {
      return {
        success: false,
        errors: errors
      };
    } else {
      return {
        success: true
      };
    }
  } catch (error) {
    await availability_edit.rollback();
    return {
      success: false,
      errors: [{
        path: ['base'],
        message: error
      }]
    };
  }
}


export async function checkAvailabilityAndCreateOrDestroy(chofer_id, type, data) {
  let availability_transaction = await sequelize.transaction()
  try {
    if (type === 'single') {
      let request_dates = new Set([data.date])
      if (data.dates) {
        data.dates.forEach(date => request_dates.add(date.date))
      }
      request_dates = [...request_dates]
      let availability = await Availability.findAll({
        where: {
          chofer_id: chofer_id,
          date: {
            [Op.in]: request_dates
          }
        },
        transaction: availability_transaction
      })
      for (let date of request_dates) {
        let saved_availability = availability.filter(item => item.date === date)
        let timeSlots = data.timeSlots.map(slot => ({ start_time: slot.start, end_time: slot.end }));
        if (saved_availability.length > 0) {
          // Condition par rapport au reservation @TODO PP
          await Availability.destroy({where: {chofer_id: chofer_id, date: date}, transaction: availability_transaction})
        }
        await Availability.bulkCreate(timeSlots.map(slot => ({
          chofer_id: chofer_id,
          date: date,
          start_time: slot.start_time,
          end_time: slot.end_time
        })), { transaction: availability_transaction})
      }
      await availability_transaction.commit()
      return {
        success: true
      }
    } else {
      return {
        success: false
      }
    }

  } catch (error) {
    await availability_transaction.rollback()
    return {
      success: false,
      error: error
    }
  }
}

export async function canDelete(id, chofer_id) {
  let availability = (await Availability.findOne({
    where: {
      id: id,
      chofer_id: chofer_id
    }
  })).dataValues
  let availability_date = new Date(availability.date).toISOString()
  let chofer_reservations = await Rides.count({
    where: {
      chofer_id: chofer_id,
      date: availability_date,
      hour: {
        [Op.between]: [availability.start_time, availability.end_time]
      }
    }
  })
  return !(chofer_reservations > 0)
}