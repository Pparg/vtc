import validateSchema from "../middlewares/validates/index.mjs"

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

let createAccount = (req, res) => {
  res.send({
    accion: 'create'
  })
}

export {login, logout, createAccount}