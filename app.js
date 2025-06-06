import express from 'express'
import morgan from 'morgan'
import { corsMiddleware } from '#middlewares/cors.js'
import { urlRouter } from '#root/src/routes/urlRouter.js'
import { port, logger } from '#root/config.js'

const app = express()

app.use(express.json())
app.use(morgan(logger))
app.use(corsMiddleware())

app.use(urlRouter)

app.listen(port, async () =>
  console.log(`\nServer running on port ${port}\n`)
)
