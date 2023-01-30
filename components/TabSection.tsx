import axios from "axios";
import React, { useEffect, useState } from "react";
import SurahCard from "./SurahCard";

const TabSection = () => {
  const [chapters, setChapters] = useState([]);
  const [sort, setSort] = useState("asc");
  useEffect(() => {
    axios
      .get("https://api.quran.com/api/v4/chapters?language=en")
      .then(({ data }) => setChapters(data.chapters));
  }, []);

  return (
    <div className="text-white container py-5 px-5">
      <div className="flex gap-10 border-b border-white">
        <button className="border-b-2 border-white pb-1">Surah</button>
        <button className="border-b-2 border-transparent pb-1">Juz</button>
      </div>
      <div className="flex items-center justify-end text-xs mt-2">
        <p className="text-gray-300 pt-[.6px]">SORTERA EFTER:</p>
        <select
          onChange={(e) => setSort(e.target.value)}
          className="bg-transparent text-white focus:outline-none"
        >
          <option className="text-black" value="asc">
            Stigande
          </option>
          <option className="text-black" value="desc">
            Nedåtgående
          </option>
        </select>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {sort == "asc"
          ? chapters.map((chapter: any, i: number) => (
              <SurahCard key={i} chapter={chapter} />
            ))
          : chapters
              .slice(0)
              .reverse()
              .map((chapter: any, i: number) => (
                <SurahCard key={i} chapter={chapter} />
              ))}
      </div>
    </div>
  );
};

export default TabSection;
