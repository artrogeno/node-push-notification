import { Router } from 'express'

import notification from './notification'

const routes = Router()

routes.use('/notification', notification)

export default routes
