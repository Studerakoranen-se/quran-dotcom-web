import { Knex } from "knex";

const tableName: string = "quizes";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id").unique().primary();
    table.bigInteger("lesson_id");
    table.string("name");
    table.text("description");
    table.string("q1");
    table.string("q2");
    table.string("q3");
    table.string("q4");
    table.json("answer");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
