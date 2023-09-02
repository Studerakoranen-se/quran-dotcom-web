import { db } from '~/database'

export class UserController {
  static updateUser = async (userID: string | number, data: any) => {
    return await db('users').where({ id: userID }).update(data)
  }

  static getUser = async (userID: string | number) => {
    return await db('users').where({ id: userID }).first()
  }
}
