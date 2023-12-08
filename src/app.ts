import './setupDatabase'
import './laodDotenv'
import router from './routes/router'
import express, { json } from 'express'
import { appConfig } from './config/appConfig'
import cookieParser from 'cookie-parser'

const app = express()

app.listen(appConfig.express.port, () => {
  console.log('Listen port 3000')
})

app.use(json())
app.use(cookieParser())
app.use('/', router)
