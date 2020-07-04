import { Router } from 'express'

import notificationController from './notificationController'

const routes = Router()

routes.get('/', notificationController.index)

routes.post('/subscribe', notificationController.subscribe)

routes.post('/subscribe/new', notificationController.newSubscribe)

export default routes
