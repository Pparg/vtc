import Chofer from "../../models/Chofers.mjs"
import Role from "../../models/Roles.mjs";
import { hashPassword } from "../../utils/security/password.mjs";


let get = async (req, res) => {
  try {
    let page = parseInt(req.query.page || 1);
    let per_page = parseInt(req.query.per_page || 10)
    let offset = (page - 1) * per_page
    let selected_atributes = ['id', 'last_name', 'first_name', 'created_at', 'email']
    let choffers = await Chofer.findAll({
      offset: offset,
      limit: per_page,
      attributes: selected_atributes
    })
    let total_count = await Chofer.count()
    let total_pages = Math.ceil(total_count/per_page)
    res.successResponse(200, {
      data: choffers,
      current_page: page,
      total_pages: total_pages,
      total: total_count
    })
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let show = async (req, res) => {

}

let create = async (req, res) => {
  try {
    let hashedPassword = await hashPassword(req.data.password)
    let choffer_email = req.data.email
    let chofer_exists = await Chofer.findOne({where: {email: choffer_email}})
    if (chofer_exists) {
      res.errorResponse(400, {
        message: 'Ce compte existe déjà.'
      })
    } else {
      let role = await Role.findOne({where: {name: 'chofer'}})
      let new_choffer = await Chofer.create({
        ...req.data,
        password: hashedPassword,
        role_id: role.id,
        valid_account: false
      })
      let {password, role_id, ...chofer_info } = new_choffer.dataValues
      res.successResponse(200, {
        data: chofer_info
      })
    }
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let edit = async (req, res) => {

}


let remove = async (req, res) => {

}

export { get, create, edit, remove, show }