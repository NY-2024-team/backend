import './setupDatabase'
import './laodDotenv'
import router from './routes/router'
import express, { json } from 'express'
import { appConfig } from './config/appConfig'
import cookieParser from 'cookie-parser'
import { type CorsOptions } from 'cors'
import cors from 'cors'

const app = express()

app.listen(appConfig.express.port, () => {
  console.log('Listen port 3000')
})

const corsOptions: CorsOptions = {
  credentials: true,
  origin: ['http://localhost:5173']
}

app.use(cors(corsOptions))
app.use(json())
app.use(cookieParser())
app.use('/', router)
