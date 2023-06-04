import DefaultLayout from "@/components/Layout/DefaultLayout";
import React from "react";

const AddLessonPage = () => {
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold dark:text-white-light">
            Add course
          </h5>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddLessonPage;
