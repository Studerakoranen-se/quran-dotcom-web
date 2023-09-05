import path from 'path'
import fs from 'fs'
import { Knex } from 'knex'
import { faker } from '@faker-js/faker'

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('teachers').del()

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'tutors')
  const filePath = path.join(uploadDir, 'sample-tutor.png')

  const copyDir = path.join(process.cwd(), 'src/sample-data')
  const oldPath = path.join(copyDir, 'sample-tutor.png')

  fs.mkdirSync('./public/uploads/tutors', { recursive: true })
  fs.copyFileSync(oldPath, filePath)

  // eslint-disable-next-line @typescript-eslint/ban-types
  const teachers: Array<Object> = []

  for (let i = 0; i < 8; i++) {
    const teacher = {
      fullname: faker.name.fullName(),
      mail: faker.internet.email(),
      sex: faker.name.sex(),
      age: 26,
      phone: faker.phone.number(),
      image: 'sample-tutor.png',
      address: faker.address.streetAddress(),
      nationality: faker.address.country(),
      description: faker.lorem.sentences(2),
    }
    teachers.push(teacher)
  }

  // Inserts seed entries
  await knex('teachers').insert(teachers)
}
