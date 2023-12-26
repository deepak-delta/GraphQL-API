import mongoose from 'mongoose'
import config from 'config'

export async function connectToDb() {
  try {
    await mongoose.connect(config.get('dbUri'))
    console.log('Connected to DB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
