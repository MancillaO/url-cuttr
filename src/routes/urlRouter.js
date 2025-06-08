import { Router } from 'express'
import { UrlController } from '#controllers/urlController.js'

export const urlRouter = Router()

urlRouter.post('/api/shorten', UrlController.shorten)
urlRouter.get('/:shortcode', UrlController.redirect)
urlRouter.delete('/api/:shortcode', UrlController.delete)
