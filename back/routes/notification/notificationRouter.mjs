import { Router } from 'express';

import validateSchema from '../../middlewares/validates/body.mjs';
import hasRight from '../../middlewares/authorization/authorizationMiddleware.mjs';

import { get, show, create, remove, edit} from '../../controllers/notifications/notification_controller.mjs'

let NotificationRouter = Router()

let logNotif = (req, res, next) => {
  console.log(req.path)
  console.log('------')
  next()
}

NotificationRouter.use(logNotif)

NotificationRouter.get('/', get)

NotificationRouter.get('/:notif_id', hasRight(['admin']), show)

NotificationRouter.post('/', hasRight(['admin']), validateSchema('notification'), create)

NotificationRouter.patch('/:notif_id', hasRight(['admin']), validateSchema('notification', true), edit)

NotificationRouter.delete('/:notif_id', hasRight(['admin']), remove)

export default NotificationRouter