import { Knex } from 'knex'

const tableName = 'quizes'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').unique().primary()
    table.bigInteger('lesson_id')
    table.string('question')
    table.string('o1')
    table.string('o2')
    table.string('o3')
    table.string('o4')
    table.json('answer')
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName)
}
