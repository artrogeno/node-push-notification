// Check for service worker
if ('serviceWorker' in navigator) {
  supported(true)
  send().catch(err => console.log(err))
} else {
  supported(false)
}

async function send() {
  const subscription = await setSubscription()

  await fetch('api/notification/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  })
}

async function sendNotification() {
  const subscription = await setSubscription()

  await fetch('api/notification/subscribe/new', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  })

  countDown()
}

async function setSubscription() {
  const publicKey = await getPublicKey()
  const register = await navigator.serviceWorker.register(
    '/assets/javascript/worker.js',
    {
      scope: '/assets/javascript/',
    },
  )
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  })

  return subscription
}

async function getPublicKey() {
  let publicKey = sessionStorage.getItem('PUBLIC_KEY')
  if (publicKey) {
    // Get publicKey on session storage
    return publicKey
  }
  // Get publicKey on service
  const response = await fetch('api/notification', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  // Convert response in json
  const { public_key } = await response.json()

  // Set publicKey to session storage
  sessionStorage.setItem('PUBLIC_KEY', public_key)

  // Get publicKey on service
  return public_key
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function countDown() {
  let countDownDate = 10
  let timer = setInterval(() => {
    countDownDate--
    if (countDownDate === 0) {
      clearInterval(timer)
      document.getElementById('countdown').removeAttribute('class')
      document.getElementById('countdown').innerHTML = ''
    } else {
      document.getElementById('countdown').setAttribute('class', 'active')
      document.getElementById('countdown').innerHTML = countDownDate + 's'
    }
  }, 1000)
}

function supported(valid) {
  if (valid) {
    const message = document.getElementsByClassName('message')[0]

    message.setAttribute('style', 'display: none')
  } else {
    const notification = document.getElementsByClassName('notification')[0]
    const action = document.getElementsByClassName('action')[0]

    notification.setAttribute('style', 'display: none')
    action.setAttribute('style', 'display: none')
  }
}
