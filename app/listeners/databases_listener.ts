import Driver from '#drivers/driver'
import Database from '#models/database'

export default class DatabasesListener {
  async onCreated(database: Database) {
    const driver = await Driver.getDriver()
    await driver.databases.createDatabase(database)
  }

  async onDeleted(database: Database) {
    const driver = await Driver.getDriver()
    await driver.databases.deleteDatabase(database)
  }
}
