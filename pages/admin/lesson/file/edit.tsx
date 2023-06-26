import DefaultLayout from "@/components/Layout/DefaultLayout";
import LessonFileForm from "@/components/admin/Forms/LessonFileForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditLessonFilePage = () => {
  const router = useRouter();
  const [lessonFile, setLessonFile] = useState();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch("/api/v1/lesson/list", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        const output = result.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        setLessons(output);
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    fetch("/api/v1/file/details?id=" + router.query.id, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setLessonFile(result))
      .catch((error) => console.log("error", error));
  }, [router.query.id]);
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold dark:text-white-light">
            Edit Lesson
          </h5>
        </div>
        {lessonFile && (
          <LessonFileForm lessonFile={lessonFile} lessons={lessons} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default EditLessonFilePage;
