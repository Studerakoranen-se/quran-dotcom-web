import { db } from "@/database";

interface TeacherInterface {
  fullname?: string;
  sex?: string;
  age?: number;
  mail?: string;
  phone?: string;
  image?: string;
  address?: string;
  nationality?: string;
}

class TeacherController {
  static index = async () => {
    return await db("teachers");
  };

  static create = async (data: TeacherInterface): Promise<any> => {
    await db("teachers").insert(data);
    return data;
  };

  static update = async (id: any, data: TeacherInterface): Promise<any> => {
    await db("teachers").where("id", id).update(data);
    return data;
  };

  static delete = async (id: any): Promise<boolean> => {
    await db("teachers").where("id", id).delete();
    return true;
  };
}

export { TeacherController };
