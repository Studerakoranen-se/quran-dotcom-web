import { Knex } from "knex";

const tableName: string = "lessons";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id").unique().primary();
    table.bigInteger("course_id").notNullable();
    table.string("name");
    table.string("youtube_video");
    table.string("duration");
    table.text("description");
    table.text("content");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
