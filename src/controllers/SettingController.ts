import { db } from '~/database'

// Define the site settings model

// eslint-disable-next-line import/prefer-default-export
export class SiteSettings {
  // Function to retrieve all site settings
  static getAllSettings = async () => {
    try {
      const settings = await db('settings').select('*')
      return settings
    } catch (error: any) {
      throw new Error(`Error retrieving site settings: ${error.message}`)
    }
  }

  // Function to retrieve a specific site setting by key
  static getSettingByKey = async (key: string[]) => {
    try {
      const setting = await db('settings').whereIn('key', key)
      return setting
    } catch (error: any) {
      throw new Error(`Error retrieving site setting: ${error.message}`)
    }
  }

  // Function to update a site setting by keys
  static updateSettingByKey = async (settings: { key: string; value: string }[]) => {
    try {
      const updatePromises = settings.map(async (setting) => {
        await db('settings').where('key', setting.key).update('value', setting.value)
      })

      await Promise.all(updatePromises)
    } catch (error: any) {
      throw new Error(`Error updating site settings: ${error.message}`)
    }
  }
}
