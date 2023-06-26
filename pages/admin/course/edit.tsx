import DefaultLayout from "@/components/Layout/DefaultLayout";
import CourseForm from "@/components/admin/Forms/CourseForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddCourse = () => {
  const [course, setCourse] = useState();
  const router = useRouter();
  useEffect(() => {
    console.log(router.query.id);

    fetch("/api/v1/course/details?id=1", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setCourse(result))
      .catch((error) => console.log("error", error));
  }, [router]);
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold dark:text-white-light">
            Edit course
          </h5>
        </div>
        <CourseForm course={course} />
      </div>
    </DefaultLayout>
  );
};

export default AddCourse;
