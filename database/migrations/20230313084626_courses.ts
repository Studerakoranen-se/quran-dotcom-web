import { Knex } from "knex";

const tableName: string = "courses";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("courses", (table) => {
    table.increments("id").unique().primary();
    table.string("name");
    table.string("image");
    table.text("description");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
