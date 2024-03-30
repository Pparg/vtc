import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// let EmailTransporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_ADRESS,
//     pass: process.env.EMAIL_PASSWORD
//   }
// })

const EmailTransporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.ETHEREAL_NAME,
    pass: process.env.ETHEREAL_PASSWORD
  }
}, {
  from: process.env.ETHEREAL_EMAIL
});

export async function sendEmail(message) {
  return new Promise((resolve, reject) => {
    if (!message || Object.keys(message).length === 0) {
      console.log('Empty email')
      reject(new Error('Empty email'))
    } else {
      EmailTransporter.sendMail(message, (err, info) => {
        if (err) {
          reject(err)
        } else {
          console.log('Message sent: ', info.messageId);
          console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
          resolve(info)
        }
      })
    }
  })
}
