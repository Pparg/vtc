import User from "../models/Users.mjs"

import { hashPassword, comparePassword } from "../utils/security/password.mjs"

let login = (req, res) => {
  res.send({
    accion: 'login'
  })
}

let logout = (req, res) => {
  res.send({
    accion: 'logout'
  })
}

let createAccount = async (req, res) => {
  let hashedPassword = await hashPassword(req.body.password)
  try {
    let new_user = await User.create(req.body)
    res.status(201).json(new_user)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

export {login, logout, createAccount}