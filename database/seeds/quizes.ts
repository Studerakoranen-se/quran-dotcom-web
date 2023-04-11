import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("quizes").del();

  const quizes: Array<Object> = [];

  const lessons = await knex("lessons");

  lessons.forEach((lesson: any) => {
    for (let i = 0; i < 5; i++) {
      const quize = {
        lesson_id: lesson.id,
        name: "Quize " + (i + 1),
        description: faker.lorem.sentence(),
        q1: faker.word.noun(),
        q2: faker.word.noun(),
        q3: faker.word.noun(),
        q4: faker.word.noun(),
        answer: JSON.stringify([1, 2]),
      };
      quizes.push(quize);
    }
  });

  // Inserts seed entries
  await knex("quizes").insert(quizes);
}
