import { DateTime } from 'luxon'
import {
  BaseModel,
  afterCreate,
  beforeCreate,
  beforeDelete,
  belongsTo,
  column,
  hasMany,
} from '@adonisjs/lucid/orm'
import Project from './project.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import slugify from 'slug'
import { generate as generateRandomWord } from 'random-words'
import Deployment from './deployment.js'
import Certificate from './certificate.js'
import { cuid } from '@adonisjs/core/helpers'
import emitter from '@adonisjs/core/services/emitter'

export default class Application extends BaseModel {
  /**
   * Regular columns.
   */
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare environmentVariables: Record<string, string>

  @column()
  declare sharedIpv4: string | null

  @column()
  declare ipv6: string | null

  /**
   * Relationships.
   */

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @column()
  declare projectId: number

  @hasMany(() => Deployment)
  declare deployments: HasMany<typeof Deployment>

  @hasMany(() => Certificate)
  declare certificates: HasMany<typeof Certificate>

  /**
   * Hooks.
   */
  @beforeCreate()
  static async assignSlug(application: Application) {
    let slug = slugify(application.name, { lower: true, replacement: '-' })
    while (await Application.findBy('slug', slug)) {
      slug += '-' + generateRandomWord({ exactly: 1 })
    }
    application.slug = slug
  }

  @beforeCreate()
  static async assignId(application: Application) {
    application.id = cuid()
  }

  @afterCreate()
  static async emitCreatedEvent(application: Application) {
    emitter.emit('applications:created', application)
  }

  @beforeDelete()
  static async emitDeletedEvent(application: Application) {
    emitter.emit('applications:deleted', application)
  }

  /**
   * Timestamps.
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
