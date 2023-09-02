import { Knex } from 'knex'
import { faker } from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  const user = {
    fullname: 'Jhon doe',
    sex: 'male',
    age: 23,
    mail: 'admin@email.com',
    phone: '123456789',
    password: '12345678',
    role: 'admin',
    image: '',
    address: '',
    nationality: '',
  }

  // Inserts seed entries
  await knex('users').insert(user)
}
