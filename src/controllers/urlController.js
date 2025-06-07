import { UrlModel } from '#models/urlModel.js'

export class UrlController {
  static async shorten (req, res) {
    const { url, code, description } = req.body

    if (!url) {
      return res.status(400).json({ error: 'URL is required' })
    }

    const cleanUrl = url.trim()

    const existingUrl = await UrlModel.getUrls({ url: cleanUrl })
    if (existingUrl) {
      return res.status(400).json({ error: 'URL already exists' })
    }

    try {
      const url = await UrlModel.createUrl({ url: cleanUrl, code, description })
      return res.status(201).json({ url })
    } catch (error) {
      console.error('Error creating URL:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
  static async redirect (req, res) {

  }
  static async stats (req, res) {

  }
}
