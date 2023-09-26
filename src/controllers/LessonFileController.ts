import { db } from '~/database'
import { deleteFile } from '../../helpers/fileUpload'

interface LessonFileInterface {
  lesson_id?: string
  name?: string
  file?: string
  description?: string
}

class LessonFileController {
  static index = async (lessonID: any = null) => {
    let query = db('lesson_files')
    if (lessonID) {
      query = query.where('lesson_id', lessonID)
    }
    return query
      .join('lessons as l', 'lesson_files.lesson_id', '=', 'l.id')
      .select('lesson_files.*', 'l.name as lesson_name')
  }

  static view = async (id: any) => {
    return db('lesson_files').where('id', id).first()
  }

  static create = async (data: LessonFileInterface): Promise<any> => {
    await db('lesson_files').insert(data)
    return data
  }

  static update = async (id: any, data: LessonFileInterface): Promise<any> => {
    const file = await db('lesson_files').where('id', id).first()
    if (file && data.file) {
      deleteFile(file.file)
    }
    await db('lesson_files').where('id', id).update(data)
    return data
  }

  static delete = async (id: any): Promise<boolean> => {
    const file = await db('lesson_files').where('id', id).first()
    if (file) {
      deleteFile(file.file)
      await db('lesson_files').where('id', id).delete()

      return true
    }
    return false
  }
}
// eslint-disable-next-line import/prefer-default-export
export { LessonFileController }
