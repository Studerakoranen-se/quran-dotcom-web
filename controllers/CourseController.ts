import { db } from "@/database";

interface CourseInterface {
  name?: string;
  image?: string;
  description?: string;
}

class CourseController {
  static index = async () => {
    return await db("courses");
  };

  static create = async (data: CourseInterface): Promise<any> => {
    await db("courses").insert(data);
    return data;
  };

  static update = async (id: any, data: CourseInterface): Promise<any> => {
    await db("courses").where("id", id).update(data);
    return data;
  };

  static delete = async (id: any): Promise<boolean> => {
    await db("courses").where("id", id).delete();
    return true;
  };
}

export { CourseController };
