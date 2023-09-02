import { db } from '~/database'

export class AuthController {
  static login = async (data: { email: string; password: string }) => {
    return await db('users')
      .where({
        mail: data.email,
        password: data.password,
      })
      .first()
  }
}
