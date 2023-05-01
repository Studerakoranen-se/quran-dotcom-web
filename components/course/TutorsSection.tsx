import Image from "next/image";
import { useState, useEffect } from "react";

type Props = {
  setSelectedTutor: any;
  tutors: any;
};

const TutorsSection = ({ setSelectedTutor, tutors }: Props) => {
  return (
    <div className="container text-white py-10">
      <div className="text-center">
        <h1 className=" font-elMessiri text-3xl">Our Tutor</h1>
        <p className="py-3">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or
        </p>
      </div>
      <div className="py-10 grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {tutors.map((tutor: any, i: number) => (
          <div
            key={i}
            className="group cursor-pointer bg-white rounded-lg overflow-hidden relative"
          >
            <div className="relative w-full h-40">
              <Image fill src={"/uploads/tutors/" + tutor.image} alt="" />
            </div>
            <div className="px-5 py-3">
              <h1 className="text-lg font-semibold pb-2 text-[#043B3B]">
                {tutor.fullname}
              </h1>
              <p className="text-[#365F5F] text-xs">
                {tutor.description.slice(0, 100) + "..."}
              </p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-1000 absolute top-0 left-0 w-full h-full bg-[#064B4B] bg-opacity-80">
              <div className="p-5">
                <h1 className="font-semibold py-3">{tutor.fullname}</h1>
                <p className="text-sm font-light">{tutor.description}</p>
              </div>
              <button
                onClick={() => setSelectedTutor(tutor.mail)}
                className="absolute bottom-0 right-0 text-sm bg-color1 px-5 rounded-full py-1 mb-1 mr-1"
              >
                Select this tutor
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorsSection;
