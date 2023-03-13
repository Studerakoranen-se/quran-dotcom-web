import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("teachers").del();

  const teachers: Array<Object> = [];

  for (let i = 0; i < 5; i++) {
    const teacher = {
      fullname: faker.name.fullName(),
      mail: faker.internet.email(),
      sex: faker.name.sex(),
      age: 26,
      phone: faker.phone.number(),
      image: faker.image.avatar(),
      address: faker.address.streetAddress(),
      nationality: faker.address.country(),
    };
    teachers.push(teacher);
  }

  // Inserts seed entries
  await knex("teachers").insert(teachers);
}
