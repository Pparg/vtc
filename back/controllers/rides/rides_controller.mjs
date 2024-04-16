import Rides from "../../models/Rides.mjs"
import User from "../../models/Users.mjs"

import { getAvailableChofer, isUnique } from "../../utils/ride.js"
import { Op } from 'sequelize'

let get = async (req, res) => {
  try {
    let page = parseInt(req.query.page || 1)
    let per_page = parseInt(req.query.per_page || 10)
    let offset = (page - 1) * per_page
    let user_reservation = await Rides.findAll({
      where: {
        user_id: req.user.id
      },
      order: [['date', 'DESC'], ['hour', 'ASC']],
      offset: offset,
      limit: per_page,
      attributes: ['id', 'destination', 'departure', 'date', 'hour']
    })
    let total_count = await Rides.count({
      where: {
        user_id: req.user.id
      }
    })
    let total_pages = Math.ceil(total_count / per_page)
    res.successResponse(200, {
      data: user_reservation,
      current_page: page,
      total_pages: total_pages,
      total: total_count
    })
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let get_resume = async (req, res) => {
  try {
    let today = new Date()
    let current_hour = new Date(today.setHours(today.getHours() + 2, today.getMinutes(), 0, 0))
    let role_attribute = ['admin', 'user'].includes(req.user.role) ? 'user_id' : 'chofer_id'
    let last_reservation = await Rides.findAll({
      where: {
        [role_attribute]: req.user.id,
        date: {
          [Op.lte]: today
        },
        hour: {
          [Op.lt]: current_hour
        }
      },
      limit: 3,
      order: [['date', 'ASC'], ['hour', 'ASC']],
      attributes: ['destination', 'departure', 'date', 'hour']
    })
    let pending_reservation = await Rides.findAll({
      where: {
        [role_attribute]: req.user.id,
        date: {
          [Op.gte]: today
        },
        hour: {
          [Op.gte]: current_hour
        }
      },
      limit: 3,
      order: [['date', 'ASC'], ['hour', 'ASC']],
      attributes: ['destination', 'departure', 'date', 'hour']
    })

    res.successResponse(200, {
      pending: pending_reservation,
      passed: last_reservation
    })

  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let chofer_get = async (req, res) => {
  try {
    let today = new Date()
    let current_hour = new Date(today.setHours(today.getHours() + 2, today.getMinutes(),0,0))
    let chofer_reservations
    let page = parseInt(req.query.page || 1)
    let per_page = parseInt(req.query.per_page || 10)
    let offset = (page - 1) * per_page
    if (req.query.type === 'passed') {
      chofer_reservations = await Rides.findAndCountAll({
        where: {
          chofer_id: req.user.id,
          date: {
            [Op.lte]: today
          },
          hour: {
            [Op.lt]: current_hour
          }
        },
        include: [{
          model: User,
          attributes: ['last_name', 'first_name', 'id'],
          required: true,
          as: 'user'
        }],
        order: [['date', 'ASC'], ['hour', 'ASC']],
        offset: offset,
        limit: per_page,
        attributes: ['id', 'destination', 'departure', 'date', 'hour']
      })
    } else {
      chofer_reservations = await Rides.findAndCountAll({
        where: {
          chofer_id: req.user.id,
          date: {
            [Op.gte]: today
          },
          hour: {
            [Op.gte]: current_hour
          }
        },
        include: [{
          model: User,
          attributes: ['last_name', 'first_name', 'id'],
          required: true,
          as: 'user'
        }],
        order: [['date', 'ASC'], ['hour', 'ASC']],
        offset: offset,
        limit: per_page,
        attributes: ['id', 'destination', 'departure', 'date', 'hour']
      })
    }
    let total_pages = Math.ceil(chofer_reservations.count / per_page)
    res.successResponse(200, {
      data: chofer_reservations.rows,
      current_page: page,
      total_pages: total_pages,
      total: chofer_reservations.count
    })
  } catch (error) {
    res.errorResponse(500, error.message) 
  }
}

let edit = async (req, res) => {
  try {
    let updated_reservation = await Rides.update(req.data, {
      where: {
        id: req.params.ride_id,
        user_id: req.user.id
      }
    })
    res.successResponse(200, updated_reservation)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let show = async (req, res) => {
  try {
    let reservation = await Rides.findOne({
      where: {
        user_id: req.user.id,
        id: req.params.ride_id
      },
      attributes: ['id', 'destination', 'departure', 'number_of_people', 'date', 'hour', 'comments']
    })
    res.successResponse(200, reservation?.dataValues)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let remove = async (req, res) => {
  try {
    await Rides.destroy({
      where: {
        id: req.params.ride_id,
        user_id: req.user.id
      }
    })
    res.successResponse(204)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let create = async (req, res) => {
  try {
    let is_unique = await isUnique(req.data, req.user.id)
    if (is_unique) {
      let available_chofer = await getAvailableChofer(req.data)
      if (available_chofer) {
        let reservation = await Rides.create({
          ...req.data,
          user_id: req.user.id,
          chofer_id: available_chofer,
        })
        return res.successResponse(200, { test: 'create', data: reservation })
      } else {
        return res.errorResponse(400, [{
          path: ['base'],
          message: "Actuellement aucun chauffeur n'est disponible."
        }])
      }
    } else {
      return res.errorResponse(400, [{
        path: ['exists'],
        message: "Vous avez déjà éffectué une réservation à cette heure là."
      }])
    }
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

export { get, chofer_get, create, edit, show, remove, get_resume}