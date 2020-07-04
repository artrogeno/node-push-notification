import dotenv from 'dotenv'

dotenv.config()

export const environment = {
  port: process.env.PORT || 3000,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
}
