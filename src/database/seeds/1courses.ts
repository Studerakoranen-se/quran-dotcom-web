import path from 'path'
import fs from 'fs'
import { Knex } from 'knex'
import { faker } from '@faker-js/faker'

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('courses').del()

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  const filePath = path.join(uploadDir, 'sample.png')

  const copyDir = path.join(process.cwd(), 'src/sample-data')
  const oldPath = path.join(copyDir, 'sample.png')

  fs.mkdirSync('./public/uploads', { recursive: true })
  fs.copyFileSync(oldPath, filePath)

  // eslint-disable-next-line @typescript-eslint/ban-types
  const courses: Array<Object> = []

  for (let i = 0; i < 5; i++) {
    const course = {
      name: `course${i + 1}`,
      image: 'sample.png',
      description: faker.lorem.paragraphs(1),
    }
    courses.push(course)
  }

  // Inserts seed entries
  await knex('courses').insert(courses)
}
