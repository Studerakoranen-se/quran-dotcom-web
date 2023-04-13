import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("courses").del();

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, "sample.png");

  const copyDir = path.join(process.cwd(), "sample-data");
  const oldPath = path.join(copyDir, "sample.png");

  fs.mkdirSync("./public/uploads", { recursive: true });
  fs.copyFileSync(oldPath, filePath);

  const courses: Array<Object> = [];

  for (let i = 0; i < 5; i++) {
    const course = {
      name: "course " + i + 1,
      image: "sample.png",
      description: faker.lorem.paragraphs(1),
    };
    courses.push(course);
  }

  // Inserts seed entries
  await knex("courses").insert(courses);
}
