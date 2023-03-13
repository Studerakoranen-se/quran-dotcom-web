import { Knex } from "knex";

const tableName: string = "enrollments";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("enrollments", (table) => {
    table.increments("id").unique().primary();
    table.string("fullname");
    table.enum("sex", ["male", "female"]);
    table.integer("age");
    table.string("mail");
    table.string("gurdian_mail");
    table.string("phone");
    table.string("gurdian_phone");
    table.string("address");
    table.integer("study_period").comment("in month/s");
    table.text("others");
    table.string("course_name");
    table.string("teacher_name");
    table.string("teacher_email");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
