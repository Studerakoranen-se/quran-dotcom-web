import { db } from '~/database'

interface QuizeInterface {
  lesson_id?: string
  name?: string
  description?: string
  q1?: string
  q2?: string
  q3?: string
  q4?: string
  answer?: string
}

class QuizeController {
  static index = async (lessonID: any = null) => {
    let query = db('quizes')
    if (lessonID) {
      query = query.where('lesson_id', lessonID)
    }
    return await query
      .join('lessons as l', 'quizes.lesson_id', '=', 'l.id')
      .join('courses as c', 'l.course_id', '=', 'c.id')
      .select('quizes.*', 'l.name as lesson_name', 'c.name as course_name')
  }

  static create = async (data: QuizeInterface): Promise<any> => {
    await db('quizes').insert(data)
    return data
  }

  static update = async (id: any, data: QuizeInterface): Promise<any> => {
    await db('quizes').where('id', id).update(data)
    return data
  }

  static delete = async (id: any): Promise<boolean> => {
    await db('quizes').where('id', id).delete()
    return true
  }

  static details = async (id: string | number): Promise<any> => {
    return await db('quizes').where('id', id).first()
  }
}

export { QuizeController }
