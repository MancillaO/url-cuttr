import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'
import { mongoUrl } from '#root/config.js'

const client = new MongoClient(mongoUrl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function connect () {
  try {
    await client.connect()
    const database = client.db('url_cuttr')
    return database.collection('urls')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

const db = await connect()

export class UrlModel {
  static async createUrl ({ url, code, description }) {
    const urlDoc = {
      url,
      code,
      description,
      clicks: 0,
      active: true,
      createdAt: new Date()
    }
    const result = await db.insertOne(urlDoc)
    const newUrl = await this.getUrlById(result.insertedId)
    return newUrl
  }

  static async reactivateUrl (id) {
    const result = await db.updateOne({ _id: new ObjectId(id) }, { $set: { active: true } })
    return result
  }

  static async getUrls ({ url }) {
    const query = {}
    if (url) {
      query.url = url
    }
    const urls = await db.find(query).toArray()
    return urls
  }

  static async getUrlById (id) {
    const url = await db.findOne({ _id: new ObjectId(id) })
    return url
  }
}
