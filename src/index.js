import Server from './server'
import { environment } from './environments'

Server.listen(environment.port, () => {
  console.log(`Server is running on port: ${environment.port}`)
})
