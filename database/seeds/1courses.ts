import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("courses").del();

  const courses: Array<Object> = [];

  for (let i = 0; i < 5; i++) {
    const course = {
      name: "course " + i + 1,
      image: faker.image.nature(),
      description: faker.lorem.paragraphs(1),
    };
    courses.push(course);
  }

  // Inserts seed entries
  await knex("courses").insert(courses);
}
