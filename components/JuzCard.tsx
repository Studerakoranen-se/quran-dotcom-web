import Link from "next/link";
import React from "react";
import SurahCard from "./SurahCard";

const JuzCard = (props: any) => {
  const { juz, chapters } = props.juz;

  console.log(chapters);

  return (
    <div className="bg-[#021f1f] p-5 rounded break-inside-avoid-column">
      <div className="flex justify-between items-end pb-5">
        <Link href={"/juz/" + juz.juz_number}>
          <h1>Juz {juz.juz_number}</h1>
        </Link>
        <Link href={"/juz/" + juz.juz_number} className=" underline text-sm">
          Read Juz
        </Link>
      </div>
      <div className=" space-y-5">
        {chapters.map((chapter: any, i: number) => (
          <SurahCard chapter={chapter} key={i} />
        ))}
      </div>
    </div>
  );
};

export default JuzCard;
