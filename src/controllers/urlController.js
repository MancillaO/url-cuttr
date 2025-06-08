import { validateUrl } from '#schemas/urlSchema.js'
import { UrlService } from '#services/urlService.js'
import { UrlModel } from '#models/urlModel.js'

export class UrlController {
  static async shorten (req, res) {
    const { data, error } = validateUrl(req.body)

    if (error) {
      return res.status(422).json({ error: JSON.parse(error.message) })
    }

    try {
      const codeExists = await UrlService.validateExistingCode(data.code)
      if (codeExists) {
        return res.status(400).json({ error: 'El código ya está en uso' })
      }

      const newUrl = await UrlModel.createUrl({ input: data })

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
    const { shortcode } = req.params

    try {
      const url = await UrlModel.getUrlByCode({ code: shortcode })

      console.log(url)

      if (!url) {
        return res.status(404).json({ error: 'URL no encontrada' })
      }

      await UrlModel.updateUrlClicks({ id: url._id, clicks: url.clicks + 1 })

      return res.redirect(url.url)
    } catch (error) {
      console.error('Error redirecting URL:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
  static async delete (req, res) {
    const { shortcode } = req.params

    try {
      const url = await UrlModel.getUrlByCode({ code: shortcode })

      if (!url) {
        return res.status(404).json({ error: 'URL no encontrada' })
      }

      const result = await UrlModel.deleteOne({ _id: url._id })

      if (result.deletedCount === 0) {
        return res.status(500).json({ error: 'Error al eliminar la URL' })
      }

      return res.status(200).json({ message: 'URL eliminada exitosamente', url })
    } catch (error) {
      console.error('Error deleting URL:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
