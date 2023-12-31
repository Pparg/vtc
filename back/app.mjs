import express, { json } from 'express'
import dotenv from 'dotenv'
import { corsMiddleware } from './middlewares/cors/index.mjs'

import successResponseMiddleWare from './middlewares/response/successResponseMiddleware.mjs'
import errorResponseMiddleware from './middlewares/response/errorResponseMiddleware.mjs'

import ApiRouter from './routes/ApiRouter.mjs'

dotenv.config()

let app = express()
app.disable('x-powered-by')

let PORT = process.env.PORT 

app.use(json())

app.use(corsMiddleware())

app.use(successResponseMiddleWare)
app.use(errorResponseMiddleware)

app.use('/api', ApiRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})