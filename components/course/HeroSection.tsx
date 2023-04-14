import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseHeroSection = () => {
  return (
    <div className="bg-[url('/assets/quran-bkg.png')] bg-center bg-no-repeat bg-contain">
      <div className="relative py-10 h-[30rem] container max-w-5xl px-5 grid md:grid-cols-2 justify-items-center items-center gap-5 text-sm ">
        <div className="z-10 text-white">
          <h1 className="text-4xl font-elMessiri">
            Välkommen till <br /> StuderaKoranen!
          </h1>
          <p className="py-3">-Studera Koranen online</p>
          <p className="pt-3 pb-6">
            StuderaKoranen är en unik satsning vars syfte är att främja
            koranundervisning i Sverige. Vi erbjuder inspelade kurser,
            kursmaterial, koran-app, rådgivning och mycket mer!
          </p>
          <Link
            href={""}
            className="bg-white text-black px-5 py-2 rounded-full"
          >
            Enroll Now
          </Link>
        </div>
        <div className="absolute opacity-20 md:opacity-100 md:relative w-full h-[18rem] md:w-[20rem]">
          <Image fill src={"/assets/quran.png"} alt="Quran" />
        </div>
      </div>
    </div>
  );
};

export default CourseHeroSection;
