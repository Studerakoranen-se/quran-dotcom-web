import { Knex } from 'knex'

const tableName = 'lesson_files'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').unique().primary()
    table.bigInteger('lesson_id')
    table.string('name')
    table.string('file')
    table.text('description')
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName)
}
