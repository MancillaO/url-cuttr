import { UrlModel } from '#models/urlModel.js'

export class UrlController {
  static async shorten (req, res) {
    const { url, code, description } = req.body

    if (!url) {
      return res.status(400).json({ error: 'URL is required' })
    }

    const cleanUrl = url.trim()
  }
  static async redirect (req, res) {

  }
  static async stats (req, res) {

  }
}
