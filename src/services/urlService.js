import { UrlModel } from '#models/urlModel.js'

export class UrlService {
  static async validateUrl (url) {
    const existingUrls = await UrlModel.getUrls({ url })
    const existingUrl = existingUrls[0]

    return {
      exists: !!existingUrl,
      isActive: existingUrl?.active || false,
      urlData: existingUrl || null
    }
  }
}
