import sequelize from "../config/database.mjs"
import Availability from "../models/Availability.mjs"
import { Op } from "sequelize"

export function setAvailabilityConfig (type = null) {
  let now = new Date()
  let today_start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
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