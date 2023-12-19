import express from 'express'
import dotenv from 'dotenv'

import router from '../routes/index.mjs'

dotenv.config()

let app = express()
app.disable('x-powered-by')

let PORT = process.env.PORT 

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})