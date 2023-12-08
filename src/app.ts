import './setupDatabase'
import './laodDotenv'
import router from './routes/router'
import express, { json } from 'express'

const app = express()

app.listen(3000, () => {
  console.log('Listen port 3000')
})

app.use(json())
app.use('/', router)
