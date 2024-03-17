import Address from "../../models/Address.mjs";

// [GET] /adress
let index = async (req, res) => {
  try {
    let page = parseInt(req.query.page || 1)
    let per_page = parseInt(req.query.per_page || 10)
    let offset = (page - 1) * per_page
    let current_user = req.user
    let user_adresses = await Address.findAll({
      where: {
        user_id: current_user.id
      },
      order: [['created_at', 'DESC']],
      offset: offset,
      limit: per_page,
      attributes: ['id', 'address', 'city', 'comment', 'name']
    })
    let total_count = await Address.count({
      where: {
        user_id: current_user.id
      }
    })
    let total_pages = Math.ceil(total_count / per_page)
    res.successResponse(200, {
      data: user_adresses,
      current_user: page,
      total_pages: total_pages,
      total: total_count
    })
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [GET] /adress/:id
let show = async (req, res) => {
  try {
    let current_user = req.user
    let adress = await Address.findOne({
      where: {
        id: req.params.id,
        user_id: current_user.id
      },
      attributes: ['id', 'address', 'city', 'zip_code', 'country', 'comment', 'name', 'longitude', 'latitude']
    })
    res.successResponse(200, adress.dataValues)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [POST] /adress/
let create = async (req, res) => {
  try {
    let current_user = req.user
    let new_adress = await Address.create({
      ...req.data,
      user_id: current_user.id
    })
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [PATCH] /adress/:id
let update = async (req, res) => {
  try {
    let current_user = req.user
    let edited_adress = 'test' //TODO
    res.successResponse(200, edited_adress)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [DELETE] /adress/:id
let remove = async (req, res) => {
  try {
    let current_user = req.user
    let adress = await Address.findOne({where: {id: req.params.id, user_id: current_user.id}})
    await adress.destroy()
    res.successResponse(204)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

export { create, index, show, update, remove}