import Chofer from "../../models/Chofers.mjs";
import Availability from "../../models/Availability.mjs";
import { Op } from "sequelize";

import { setAvailabilityConfig, checkAvailabilityAndCreateOrDestroy } from "../../utils/availability.js";

let index = async (req, res) => {
  try {
    let date_config = setAvailabilityConfig(req.query.type)
    let chofer_availability = await Availability.findAll({
      where: {
        chofer_id: req.user.id,
        date: {
          [Op.between]: [date_config.start, date_config.end]
        }
      },
      attributes: ['date', 'start_time', 'end_time', 'id'],
    })
    res.successResponse(200, {
      data: chofer_availability
    })
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let show = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

let create = async (req, res) => {
  try {
    let availability_creation = await checkAvailabilityAndCreateOrDestroy(req.user.id, req.query.type, req.data)
    if (availability_creation.success) {
      res.successResponse(201)
    } else {
      res.errorResponse(400, availability_creation.error )
    }
  } catch (error) {
    res.errorResponse(500, error.message )
  }
}

let update = async (req, res) => {
  try {

  } catch (error) {

  }
}

let remove = async (req, res) => {
  try {

  } catch (error) {

  }
}

export { create, index, show, update, remove}