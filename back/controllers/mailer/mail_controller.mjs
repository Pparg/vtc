import EmailTransporter from "../../config/mailer.mjs";
import dotenv from 'dotenv'

let sendMail = async (req, res) => {
  try {
    let email_options = {
      from: process.env.EMAIL_ADRESS,
      to: req.data.to,
      subject: req.data.subject,
      text: req.data.content
    }
    EmailTransporter.sendMail(email_options, (error, info) => {
      if (error) {
        res.errorResponse(400, error)
      } else {
        res.sucessResponse(201)
      }
    })
  } catch (error) {
    res.errorResponse(500, error)
  }
}

let sendTemplateEmail = async (req, res) => {
  
}