import { db } from '~/database'

// eslint-disable-next-line import/prefer-default-export
export class AuthController {
  static login = async (data: { email: string; password: string }) => {
    return db('users')
      .where({
        mail: data.email,
        password: data.password,
      })
      .first()
  }
}
