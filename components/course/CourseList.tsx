import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/api/v1/course/list", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setCourses(result))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="container text-white pt-16">
      <h1 className="font-elMessiri text-3xl text-center">our courses</h1>
      <p className="text-sm text-center text-gray-300 pt-8">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
      </p>
      <div className="space-y-10 py-10 mx-auto">
        {courses.map((course: any, i: number) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
