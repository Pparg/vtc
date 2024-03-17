import Car from "../../models/Cars.mjs";

// [GET] /api/cars
let get = async(req, res) => {
  try {
    let page = parseInt(req.query.page || 1);
    let per_page = parseInt(req.query.per_page || 10)
    let offset = (page - 1) * per_page
    let cars = await Car.findAll({
      order: [['created_at', 'DESC']],
      offset: offset,
      limit: per_page,
      attributes: ['id', 'name', 'description']
    })
    let total_count = await Car.count()
    let total_pages = Math.ceil(total_count / per_page)
    res.successResponse(200, {
      data: cars,
      current_page: page,
      total_pages: total_pages,
      total: total_count
    })
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let show = async (req, res) => {
  try {
    let car = await Car.findByPk(req.params.id)
    res.successResponse(200, car.dataValues)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let create = async (req, res) => {
  try {
    let new_car = await Car.create(req.data)
    res.successResponse(200, new_car)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let edit = async (req, res) => {
  try {
    let update_car = await Car.update(req.data, {
      where: {
        id: req.params.id
      }
    })
    res.successResponse(204, update_car)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let remove = async (req, res) => {
  try {
    let car_to_delete = await Car.destroy({
      where: {
        id: req.params.id
      }
    })
    res.successResponse(204, car_to_delete)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

export {get, show, edit, create, remove}