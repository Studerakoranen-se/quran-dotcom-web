import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = (props: any) => {
  const { course } = props;
  return (
    <div className="grid grid-cols-3 gap-5 items-center shadow-2xl shadow-black bg-white rounded-r-2xl rounded-t-2xl overflow-hidden">
      <div className="relative h-full rounded-br-2xl overflow-hidden">
        <Image fill src={course.img} alt="" />
      </div>
      <div className="col-span-2 text-[#7c7c7c] p-6">
        <h1 className="font-bold text-right pb-2">{course.title}</h1>
        <div
          className="text-xs space-y-2"
          dangerouslySetInnerHTML={{
            __html: course.description,
          }}
        ></div>
        <div className="mt-5 text-right">
          <Link
            href={"course.url"}
            className={
              "bg-[#043B3B] px-14 py-1.5 text-sm text-white font-semibold rounded-full"
            }
          >
            KLICKA HÄR
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
