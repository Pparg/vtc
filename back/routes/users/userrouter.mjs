import { Router } from "express";

let UserRouter = Router()

UserRouter.get('/', (req, res) => {
  res.send('Hello')
})

export default UserRouter