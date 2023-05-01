import Image from "next/image";
import { useState, useEffect } from "react";

type Props = {
  setSelectedTutor: any;
};

const TutorsSection = ({ setSelectedTutor }: Props) => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch("/api/v1/teacher/list", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setTutors(result))
      .catch((error) => console.log("error", error));
  }, []);

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
      <div className="py-10 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {tutors.map((tutor: any, i: number) => (
          <div
            key={i}
            onClick={() => setSelectedTutor(tutor.id)}
            className=" cursor-pointer bg-white rounded-lg overflow-hidden"
          >
            <div className="relative w-full h-40">
              <Image fill src={"/uploads/tutors/" + tutor.image} alt="" />
            </div>
            <div className="px-5 py-3">
              <h1 className="text-xl font-semibold pb-3 text-[#043B3B]">
                {tutor.fullname}
              </h1>
              <p className="text-[#365F5F] text-sm">
                {tutor.description.slice(0, 50) + "..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorsSection;
