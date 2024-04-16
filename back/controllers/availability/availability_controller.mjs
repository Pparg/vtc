import Availability from "../../models/Availability.mjs";
import { Op } from "sequelize";

import { setAvailabilityConfig, checkAvailabilityAndCreateOrDestroy, updateAvailability } from "../../utils/availability.js";

let index = async (req, res) => {
  try {
    let page = parseInt(req.query.page || 1)
    let per_page = parseInt(req.query.per_page || 10)
    let offset = (page - 1) * per_page
    let date_config = setAvailabilityConfig(req.query.type)
    let chofer_availability = await Availability.findAll({
      where: {
        chofer_id: req.user.id,
        date: {
          [Op.between]: [date_config.start, date_config.end]
        }
      },
      attributes: ['date', 'start_time', 'end_time', 'id'],
      offset: offset,
      limit: per_page,
      order: [['date', 'ASC']]
    })
    let total_count = await Availability.count({
      where: {
        chofer_id: req.user.id,
        date: {
          [Op.between]: [date_config.start, date_config.end]
        }
      }
    })
    let total_pages = Math.ceil(total_count / per_page)
    res.successResponse(200, {
      data: chofer_availability,
      current_page: page,
      total: total_count,
      total_pages: total_pages
    })
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let show = async (req, res) => {
  try {
    let availability = await Availability.findOne({
      where: {
        id: req.params.availability_id,
        chofer_id: req.user.id
      }
    })
    let formated_date = new Date(availability.date)
    let availability_with_same_date = await Availability.findAll({
      where: {
        date: formated_date,
        chofer_id: req.user.id
      },
      attributes: ['start_time', 'end_time', 'id']
    })
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    res.successResponse(200, {
      data: availability_with_same_date,
      day: formated_date.toLocaleDateString('fr-FR', options)
    })
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let create = async (req, res) => {
  try {
    let availability_creation = await checkAvailabilityAndCreateOrDestroy(req.user.id, req.query.type, req.data)
    if (availability_creation.success) {
      res.successResponse(201)
    } else {
      res.errorResponse(400, [{
        path: ['base'],
        message: availability_creation.error
      }])
    }
  } catch (error) {
    res.errorResponse(500, error.message )
  }
}

let update = async (req, res) => {
  try {
    let availability_edition = await updateAvailability(req.data, req.user.id)
    if (availability_edition.success) {
      res.successResponse(204)
    } else {
      res.errorResponse(400, [{
        path: ['base'], 
        message: availability_edition.errors
      }])
    }

  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let remove = async (req, res) => {
  try {
    
    res.successResponse(200, req.data)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

export { create, index, show, update, remove}