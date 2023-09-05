import { db } from '~/database'

// eslint-disable-next-line import/prefer-default-export
export class UserController {
  static updateUser = async (userID: string | number, data: any) => {
    return db('users').where({ id: userID }).update(data)
  }

  static getUser = async (userID: string | number) => {
    return db('users').where({ id: userID }).first()
  }
}
