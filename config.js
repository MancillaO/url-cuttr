import dotenv from 'dotenv'
dotenv.config()

export const {
  PORT: port = '3000',
  NODE_ENV,
  logger = NODE_ENV === 'production' ? 'combined' : 'dev',
  MONGO_URL: mongoUrl
} = process.env
