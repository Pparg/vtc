import Rides from "../../models/Rides.mjs"

let get = async (req, res) => {
  try {
    let page = parseInt(req.query.page || 1)
    let per_page = parseInt(req.query.per_page || 10)
    let offset = (page - 1) * per_page
    let user_reservation = await Rides.findAll({
      where: {
        user_id: req.user.id
      },
      order: [['date', 'DESC']],
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
    res.successResponse(200, reservation.dataValues)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}
let remove = async (req, res) => {
  try {
    await Rides.destroy({
      where: {
        id: req.params.id,
        user_id: req.user.ride_id
      }
    })
    res.successResponse(204)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}
let create = async (req, res) => {
  try {
    let reservation = await Rides.create({
      ...req.data,
      user_id: req.user.id,
      chofer_id: 4,
    })
    res.successResponse(200, { test: 'create', data: reservation })
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

export { get, create, edit, show, remove}