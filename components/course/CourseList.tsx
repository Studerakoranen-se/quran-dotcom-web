import React from "react";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const courses = [
    {
      id: 1,
      img: "/assets/courses/course1.png",
      title: "QA'IDAH NOORANIYYAH",
      description:
        "<p>Lorem ipsum dolor sit amet, eos cu solum soluta invi-dunt, usu ne elitr intellegebat. An nec laoreet assen- tior, eam facilisi pericula torquatos te. Inani interpre-caris mediocritatem nec ad. Debitis periculis compre-hensam id duo. Vim ex nibh lorem concludaturque.ne sed animal perpetua conclusionemque, id nec ludus dolorem apeirian.</p><p>No pri fastidil euripidis vituperatoribus, ad pertinacia mnesarchum quo. Dicunt suscipit eloquentiam ea pro. et natum delenit est. Augue vitae albucius nam at.ses dolores ponderum eu. Et nam tritani deleniti. Nec populo fuisset et, cetero timeam phaedrum quiet</p>",
    },
    {
      id: 2,
      img: "/assets/courses/course2.png",
      title: "QA'IDAH NOORANIYYAH",
      description:
        "<p>Lorem ipsum dolor sit amet, eos cu solum soluta invi-dunt, usu ne elitr intellegebat. An nec laoreet assen- tior, eam facilisi pericula torquatos te. Inani interpre-caris mediocritatem nec ad. Debitis periculis compre-hensam id duo. Vim ex nibh lorem concludaturque.ne sed animal perpetua conclusionemque, id nec ludus dolorem apeirian.</p><p>No pri fastidil euripidis vituperatoribus, ad pertinacia mnesarchum quo. Dicunt suscipit eloquentiam ea pro. et natum delenit est. Augue vitae albucius nam at.ses dolores ponderum eu. Et nam tritani deleniti. Nec populo fuisset et, cetero timeam phaedrum quiet</p>",
    },
    {
      id: 3,
      img: "/assets/courses/course3.png",
      title: "QA'IDAH NOORANIYYAH",
      description:
        "<p>Lorem ipsum dolor sit amet, eos cu solum soluta invi-dunt, usu ne elitr intellegebat. An nec laoreet assen- tior, eam facilisi pericula torquatos te. Inani interpre-caris mediocritatem nec ad. Debitis periculis compre-hensam id duo. Vim ex nibh lorem concludaturque.ne sed animal perpetua conclusionemque, id nec ludus dolorem apeirian.</p><p>No pri fastidil euripidis vituperatoribus, ad pertinacia mnesarchum quo. Dicunt suscipit eloquentiam ea pro. et natum delenit est. Augue vitae albucius nam at.ses dolores ponderum eu. Et nam tritani deleniti. Nec populo fuisset et, cetero timeam phaedrum quiet</p>",
    },
    {
      id: 4,
      img: "/assets/courses/course4.png",
      title: "QA'IDAH NOORANIYYAH",
      description:
        "<p>Lorem ipsum dolor sit amet, eos cu solum soluta invi-dunt, usu ne elitr intellegebat. An nec laoreet assen- tior, eam facilisi pericula torquatos te. Inani interpre-caris mediocritatem nec ad. Debitis periculis compre-hensam id duo. Vim ex nibh lorem concludaturque.ne sed animal perpetua conclusionemque, id nec ludus dolorem apeirian.</p><p>No pri fastidil euripidis vituperatoribus, ad pertinacia mnesarchum quo. Dicunt suscipit eloquentiam ea pro. et natum delenit est. Augue vitae albucius nam at.ses dolores ponderum eu. Et nam tritani deleniti. Nec populo fuisset et, cetero timeam phaedrum quiet</p>",
    },
  ];

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
