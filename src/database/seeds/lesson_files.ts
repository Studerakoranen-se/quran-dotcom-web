import path from 'path'
import fs from 'fs'
import { Knex } from 'knex'
import { faker } from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('lesson_files').del()

  const lesson_files: Array<Object> = []

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'files')
  const filePath = path.join(uploadDir, 'sample.pdf')

  const copyDir = path.join(process.cwd(), 'sample-data')
  const oldPath = path.join(copyDir, 'sample.pdf')

  fs.mkdirSync('./public/uploads/files', { recursive: true })
  fs.copyFileSync(oldPath, filePath)

  const lessons = await knex('lessons')

  lessons.forEach((lesson: any) => {
    for (let i = 0; i < 5; i++) {
      const lessonFile = {
        lesson_id: lesson.id,
        name: `PDF ${i + 1}`,
        file: 'sample.pdf',
        description: faker.lorem.sentences(),
      }
      lesson_files.push(lessonFile)
    }
  })

  // Inserts seed entries
  await knex('lesson_files').insert(lesson_files)
}
