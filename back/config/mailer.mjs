import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

let EmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADRESS,
    pass: process.env.EMAIL_PASSWORD
  }
})

export default EmailTransporter
