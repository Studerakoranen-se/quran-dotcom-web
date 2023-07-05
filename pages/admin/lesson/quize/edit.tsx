import DefaultLayout from "@/components/Layout/DefaultLayout";
import LessonForm from "@/components/admin/Forms/LessonForm";
import QuizeForm from "@/components/admin/Forms/QuizeForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddQuizePage = () => {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [quize, setQuize] = useState([]);

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

    fetch("/api/v1/quize/details?id=" + router.query.id, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setQuize(result))
      .catch((error) => console.log("error", error));
  }, [router.query.id]);
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold dark:text-white-light">
            Edit Quize
          </h5>
        </div>
        <QuizeForm lessons={lessons} quize={quize} />
      </div>
    </DefaultLayout>
  );
};

export default AddQuizePage;
