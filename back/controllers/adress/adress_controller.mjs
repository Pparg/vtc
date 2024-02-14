import Address from "../../models/Address.mjs";

// [GET] /adress
let index = async (req, res) => {
  try {
    let current_user = req.user
    let user_adresses = await Address.findAll({where: {user_id: current_user.id}})
    res.successResponse(200, user_adresses)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [GET] /adress/:id
let show = async (req, res) => {
  try {
    let current_user = req.user
    let adress = await Address.findOne({where: {id: req.params.id}})
    res.successResponse(200, adress)
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
    res.successResponse(201)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

export { create, index, show, update, remove}