import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("lesson_files").del();

  const lesson_files: Array<Object> = [];

  const lessons = await knex("lessons");

  lessons.forEach((lesson: any) => {
    for (let i = 0; i < 5; i++) {
      const lessonFile = {
        lesson_id: lesson.id,
        name: "PDF " + (i + 1),
        file: "africau.edu/images/default/sample.pdf",
        description: faker.lorem.sentences(),
      };
      lesson_files.push(lessonFile);
    }
  });

  // Inserts seed entries
  await knex("lesson_files").insert(lesson_files);
}
