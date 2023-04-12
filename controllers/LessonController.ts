import { db } from "@/database";

interface LessonInterface {
  course_id?: string;
  name?: string;
  youtube_video?: string;
  description?: string;
  content?: string;
}

class LessonController {
  static index = async (courseID: any = null) => {
    let query = db("lessons");
    if (courseID) {
      query = query.where("course_id", courseID);
    }
    return await query;
  };

  static create = async (data: LessonInterface): Promise<any> => {
    await db("lessons").insert(data);
    return data;
  };

  static update = async (id: any, data: LessonInterface): Promise<any> => {
    await db("lessons").where("id", id).update(data);
    return data;
  };

  static delete = async (id: any): Promise<boolean> => {
    await db("lessons").where("id", id).delete();
    return true;
  };
}

export { LessonController };
