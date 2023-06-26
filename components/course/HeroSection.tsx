import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseHeroSection = () => {
  return (
    <div className="bg-[url('/assets/quran-bkg.png')] bg-center bg-no-repeat bg-contain">
      <div className="relative py-10 h-[30rem] container max-w-5xl px-5 grid md:grid-cols-2 justify-items-center items-center gap-5 text-sm ">
        <div className="z-10 text-white">
          <h1 className="text-4xl font-elMessiri">
            Välkommen till Självstudier!
          </h1>
          <p className="py-3">-Unika kurser och material</p>
          <p className="pt-3 pb-6">
            Här hittar du alla våra kurser och material. StuderaKoranen producerar kurser och spelar in
            nya lektioner löpande. Följ oss på våra sociala medier för mer info.
          </p>

          <p className="pb-7">
            Elever som vill fördjupa sig i det arabiska språket rekommenderas att besöka
            <a href="https://arabiskacentret.se" className="underline underline-offset-4 decoration-sky-400 
            decoration-1 text-semibold text-[#50d71e]
            font-semibold px-1"> 
             Arabiska centret</a>.
          </p>
        </div>
        <div className="absolute opacity-20 md:opacity-100 md:relative w-full h-[18rem] md:w-[20rem]">
          <Image fill src={"/assets/quran.png"} alt="Quran" />
        </div>
      </div>
    </div>
  );
};

export default CourseHeroSection;
