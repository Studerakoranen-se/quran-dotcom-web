import React from "react";
import SurahCard from "./SurahCard";

const TabSection = () => {
  return (
    <div className="text-white container py-5">
      <div className="flex gap-10 border-b border-white">
        <button className="border-b-2 border-white pb-1">Surah</button>
        <button className="border-b-2 border-transparent pb-1">Juz</button>
      </div>
      <div className="flex items-center justify-end text-xs mt-2">
        <p className="text-gray-300 pt-[.6px]">SORTERA EFTER:</p>
        <select name="" id="" className="bg-transparent focus:outline-none">
          <option value="">STIGANDE</option>
        </select>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-10">
        <SurahCard />
        <SurahCard />
        <SurahCard />
        <SurahCard />
        <SurahCard />
      </div>
    </div>
  );
};

export default TabSection;
