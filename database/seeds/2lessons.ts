import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("lessons").del();

  const lessons: Array<Object> = [];

  const courses = await knex("courses");

  courses.forEach((course: any) => {
    for (let i = 0; i < 5; i++) {
      const lesson = {
        course_id: course.id,
        name: "Lesson " + (i + 1),
        youtube_video: "wO2DRVC-g9w",
        description: faker.lorem.sentences(),
        content: faker.lorem.sentences(),
      };
      lessons.push(lesson);
    }
  });

  // Inserts seed entries
  await knex("lessons").insert(lessons);
}
