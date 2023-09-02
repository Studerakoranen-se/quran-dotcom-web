import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('settings').del()

  const settings = [
    { key: 'site_title', value: 'My Website' },
    { key: 'site_description', value: 'Welcome to my website!' },
    { key: 'contact_email', value: 'contact@example.com' },
    { key: 'contact_phone', value: '80123456789' },
    { key: 'facebook_url', value: 'https://www.facebook.com/your-page' },
    { key: 'twitter_url', value: 'https://www.twitter.com/your-handle' },
    { key: 'instagram_url', value: 'https://www.instagram.com/your-account' },
    { key: 'email_host', value: 'smtp.example.com' },
    { key: 'email_port', value: '587' },
    { key: 'email_username', value: 'your-email@example.com' },
    { key: 'email_password', value: 'your-email-password' },
    // Add more seed entries as needed
  ]

  // Inserts seed entries
  await knex('settings').insert(settings)
}
