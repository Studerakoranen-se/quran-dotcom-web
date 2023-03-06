import Image from "next/image";
import React from "react";

const CourseHeroSection = () => {
  return (
    <div className="bg-[url('/assets/course-hero-bg.png')] bg-center bg-no-repeat h-96 lg:h-[40rem] bg-cover  container mx-auto rounded-tl-3xl rounded-br-3xl overflow-hidden flex justify-center items-center p-20 my-10">
      <div className="text-white text-center lg:w-1/2 xl:w-1/3 ml-auto">
        <h1 className="text-5xl font-elMessiri">
          Välkommen till <br /> StuderaKoranen!
        </h1>
        <p>-Studera Koranen online</p>
        <p className="pt-10">
          StuderaKoranen är en unik satsning vars syfte är att främja
          koranundervisning i Sverige. Vi erbjuder inspelade kurser,
          kursmaterial, koran-app, rådgivning och mycket mer!
        </p>
      </div>
    </div>
  );
};

export default CourseHeroSection;
