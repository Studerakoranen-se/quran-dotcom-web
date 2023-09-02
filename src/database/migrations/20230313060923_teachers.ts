import { Knex } from 'knex'

const tableName = 'teachers'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').unique().primary()
    table.string('fullname')
    table.enum('sex', ['male', 'female'])
    table.integer('age')
    table.string('mail')
    table.string('phone')
    table.string('image')
    table.string('address')
    table.string('nationality')
    table.text('description')
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName)
}
