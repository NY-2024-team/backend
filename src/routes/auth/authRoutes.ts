import { Router } from 'express'
import { loginController } from '../../controllers/auth/loginController'
import { registrationController } from '../../controllers/auth/registrationController'
import { checkAuthController } from '../../controllers/auth/checkAuthController'
import { checkAuth } from '../../middlewares/checkAuth'

const router = Router()
router.post('/login', loginController)
router.post('/register', registrationController)
router.get('/check', checkAuth, checkAuthController)

export { router as authRouter }
