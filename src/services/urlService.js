import { UrlModel } from '#models/urlModel.js'

export class UrlService {
  static async validateExistingCode (code) {
    const url = await UrlModel.getUrlByCode({ code })

    if (!url) return false

    return true
  }
}
