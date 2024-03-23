import Notification from "../../models/Notifications.mjs";

import { Op } from "sequelize";

// [GET] /notifications
let get = async (req, res) => {
  try {
    let page = parseInt(req.query.page || 1);
    let per_page = parseInt(req.query.per_page || 10)
    let offset = (page - 1) * per_page
    let notifications = await Notification.findAll({
      order: [['created_at', 'DESC']],
      offset: offset,
      limit: per_page,
      attributes: ['id', 'title', 'content', 'type', 'publication_date'],
      where: {
        publication_date: {
          [Op.lte]: new Date()
        }
      }
    })
    let total_count = await Notification.count({
      where: {
        publication_date: {
          [Op.lte]: new Date()
        }
      }
    })
    let total_pages = Math.ceil(total_count /per_page)
    res.successResponse(200, {
      data: notifications,
      current_page: page,
      total: total_count,
      total_pages: total_pages
    })
  } catch(error) {
    res.errorResponse(500, error.message)
  }
}

let show = async(req, res) => {
  try {
    let notification = await Notification.findByPk(req.params.notif_id, {
      attributes: ['title', 'content', 'type', 'publication_date']
    })
    res.successResponse(200, notification.dataValues)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let create = async (req, res) => {
  try {
    let new_notification = await Notification.create(req.data)
    res.successResponse(200, new_notification)
  } catch (error) {
    res.errorResponse(500, error)
  }
}

let edit = async (req, res) => {
  try {
    let updated_notification = await Notification.update(req.data, {
      
      where: {
        id: req.params.notif_id
      },
    })
    res.successResponse(204, updated_notification)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

let remove = async (req, res) => {
  try {
    console.log(req.data, '****')
    let notification_to_delete = await Notification.destroy({
      where: {
        id: req.params.notif_id
      }
    })
    res.successResponse(204, notification_to_delete)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

export {remove, get, show, edit, create}