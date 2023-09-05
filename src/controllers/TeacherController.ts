import { db } from '~/database'

interface TeacherInterface {
  fullname?: string
  sex?: string
  age?: number
  mail?: string
  phone?: string
  image?: string
  address?: string
  nationality?: string
}

class TeacherController {
  static index = async () => {
    return db('teachers')
  }

  static create = async (data: TeacherInterface): Promise<any> => {
    await db('teachers').insert(data)
    return data
  }

  static update = async (id: any, data: TeacherInterface): Promise<any> => {
    await db('teachers').where('id', id).update(data)
    return data
  }

  static delete = async (id: any): Promise<boolean> => {
    await db('teachers').where('id', id).delete()
    return true
  }

  static view = async (id: string | number): Promise<any> => {
    return db('teachers').where('id', id).first()
  }
}
// eslint-disable-next-line import/prefer-default-export
export { TeacherController }
