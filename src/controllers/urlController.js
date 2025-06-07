import { UrlModel } from '#models/urlModel.js'

export class UrlController {
  static async shorten (req, res) {
    const { url, code, description } = req.body

    if (!url) {
      return res.status(400).json({ error: 'URL is required' })
    }

    const cleanUrl = url.trim()

    try {
      // Verificar si ya existe una URL activa con la misma dirección
      const existingUrl = await UrlModel.getUrls({ url: cleanUrl })
      if (existingUrl.length > 0 && existingUrl[0].active === true) {
        return res.status(400).json({ error: 'La url ya existe' })
      }

      // Create new URL if no existing active or inactive URL found
      const newUrl = await UrlModel.createUrl({ url: cleanUrl, code, description })
      if (!newUrl) {
        return res.status(500).json({ error: 'Error creating URL' })
      }
      return res.status(201).json({ message: 'URL created successfully', url: newUrl })
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
