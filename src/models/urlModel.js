import { MongoClient, ServerApiVersion } from 'mongodb'
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
    const database = client.db('url-cuttr')
    return database.collection('urls')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

const db = connect()

export class UrlModel {
  static async createUrl ({ url, code, description }) {
    const urlDoc = {
      url,
      code,
      description,
      clicks: 0,
      createdAt: new Date()
    }
    const result = await db.insertOne(urlDoc)
    return result.insertedId
  }

  static async getUrls ({ url }) {
    const query = {}
    if (url) {
      query.url = url
    }
    const urls = await db.find(query).toArray()
    return urls
  }
}
