import Chofer from "../../models/Chofers.mjs"


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

}

let edit = async (req, res) => {

}

let edit_password = async (req, res) => {

}

let remove = async (req, res) => {

}

export { get, create, edit, edit_password, remove, show }