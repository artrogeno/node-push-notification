import webpush from 'web-push'

import { environment } from '../../environments'

class NotificationController {
  constructor() {}

  index(req, res) {
    res.status(201).json({ public_key: environment.publicKey })
  }

  subscribe(req, res) {
    // Get pushSubscription object
    const subscription = req.body

    // Send 201 - Resource created
    res.status(201).json({})

    // Create Payload
    const payload = JSON.stringify({ title: 'Push Test' })

    // Pass object into sendNotification
    webpush
      .sendNotification(subscription, payload)
      .catch(err => console.log(err))
  }

  newSubscribe(req, res) {
    // Get pushSubscription object
    const subscription = req.body

    // Send 201 - Resource created
    res.status(201).json({})

    // Create Payload
    setTimeout(() => {
      const payload = JSON.stringify({ title: 'New Push Test' })
      // Pass object into sendNotification
      webpush
        .sendNotification(subscription, payload)
        .catch(err => console.log(err))
    }, 10000)
  }
}

export default new NotificationController()
