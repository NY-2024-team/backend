import { Router } from 'express'
import { loginController } from '../../controllers/auth/loginController'
import { registrationController } from '../../controllers/auth/registrationController'

const router = Router()

router.post('/login', loginController)
router.post('/register', registrationController)

export { router as authRouter }
