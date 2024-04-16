import Ride from "../models/Rides.mjs";
import Chofer from "../models/Chofers.mjs";

import { Op } from 'sequelize'
import Availability from "../models/Availability.mjs";

let setHourRanges = (hourString) => {
  let [hour, minute] = hourString.split(':').map(Number);
  let reservation_hour = new Date();
  reservation_hour.setHours(hour + 2, minute, 0, 0);

  let startHour = new Date(reservation_hour);
  let endHour = new Date(reservation_hour);

  startHour.setMinutes(startHour.getMinutes() - 30);
  endHour.setMinutes(endHour.getMinutes() + 30);

  return {
    after: endHour,
    before: startHour
  };
};



export async function isUnique(reservation, user_id) {
  let ranges = setHourRanges(reservation.hour)
  let reservation_finded = await Ride.findOne({
    where: {
      user_id: user_id,
      date: reservation.date,
      hour: {
        [Op.between]: [ranges.before, ranges.after]
      }
    }
  })
  return reservation_finded ? false : true
}

export async function getAvailableChofer(reservation) {
  let chofers_available = await Availability.findAll({
    where: {
      date: reservation.date,
      start_time: {
        [Op.lte]: reservation.hour
      },
      end_time: {
        [Op.gte]: reservation.hour
      }
    },
    attributes: ['chofer_id'],
  })
  let available_chofers_ids = chofers_available.map(availability => availability.chofer_id)
  if (available_chofers_ids.length > 0) {
    let ranges = setHourRanges(reservation.hour)
    let reserved_chofers = await Ride.findAll({
      where: {
        date: reservation.date,
        hour: {
          [Op.between]: [ranges.before, ranges.after]
        }
      },
      attributes: ['chofer_id']
    })
    let available_chofer_id = available_chofers_ids.find(chofer_id => !reserved_chofers.includes(chofer_id)) 
    return available_chofer_id ? available_chofer_id : false
  } else {
    return false
  }
}