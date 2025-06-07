import { UrlService } from '#services/urlService.js'
import { UrlModel } from '#models/urlModel.js'

export class UrlController {
  static async shorten (req, res) {
    const { url, code, description } = req.body

    if (!url) {
      return res.status(400).json({ error: 'URL is required' })
    }

    const cleanUrl = url.trim()

    try {
      const validation = await UrlService.validateUrl(cleanUrl)

      if (validation.exists && validation.isActive) {
        return res.status(400).json({ error: 'La URL ya existe' })
      }

      if (validation.exists) {
        await UrlModel.reactivateUrl(validation.urlData._id)
        const reactivatedUrl = await UrlModel.getUrlById(validation.urlData._id)
        return res.status(200).json({
          message: 'URL reactivada exitosamente',
          url: reactivatedUrl
        })
      }

      const newUrl = await UrlModel.createUrl({
        url: cleanUrl,
        code,
        description
      })

      if (!newUrl) {
        return res.status(500).json({ error: 'Error al crear la URL' })
      }

      return res.status(201).json({
        message: 'URL creada exitosamente',
        url: newUrl
      })
    } catch (error) {
      console.error('Error processing URL:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
  static async redirect (req, res) {

  }
  static async stats (req, res) {

  }
}
