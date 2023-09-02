import { Knex } from 'knex'

const tableName = 'settings'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').unique().primary()
    table.string('key').notNullable().unique()
    table.string('value').notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName)
}
