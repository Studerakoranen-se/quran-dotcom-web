import axios from "axios";
import React, { useEffect, useState } from "react";
import SurahCard from "./SurahCard";
import JuzCard from "./JuzCard";
interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

interface Juz {
  id: number;
  juz_number: number;
  verse_mapping: Record<string, string>;
  first_verse_id: number;
  last_verse_id: number;
  verses_count: number;
}

interface JuzWithChapters {
  juz_number: number;
  chapters: Chapter[];
}

const TabSection = () => {
  const [chapters, setChapters] = useState<any>([]);
  const [juzs, setJuzs] = useState<any>([]);
  const [sort, setSort] = useState("asc");
  const [selectedTab, setSelectedTab] = useState("surah");
  useEffect(() => {
    axios
      .get("https://api.quran.com/api/v4/chapters?language=sv")
      .then(({ data }) => setChapters(data.chapters));
    axios
      .get("https://api.quran.com/api/v4/juzs")
      .then(({ data }) => setJuzs(data.juzs));
  }, []);

  const getChaptersByJuz = (juzs: any, chapters: any) => {
    let juzsWithChapters: any = [];

    juzs.forEach((juz: any) => {
      const chapterIDs = Object.keys(juz.verse_mapping);
      let chapterD: any = [];

      chapters.forEach((chapter: any) => {
        if (chapterIDs.includes(chapter.id.toString())) {
          chapterD.push(chapter);
        }
      });
      juzsWithChapters.push({
        juz,
        chapters: chapterD,
      });
    });

    return juzsWithChapters;
  };

  const JuzsChs = getChaptersByJuz(juzs, chapters);

  return (
    <div className="text-white container py-5 px-5 bg-[url('/assets/bg-arbic.png')] bg-repeat-y bg-center bg-contain">
      <div className="flex gap-10 border-b border-white">
        <button
          onClick={() => setSelectedTab("surah")}
          className={
            (selectedTab == "surah" ? "border-white" : "border-transparent") +
            " border-b-2 pb-1"
          }
        >
          Surah
        </button>
        <button
          onClick={() => setSelectedTab("juz")}
          className={
            (selectedTab == "juz" ? "border-white" : "border-transparent") +
            " border-b-2 pb-1"
          }
        >
          Juz
        </button>
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
      {selectedTab == "surah" && (
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
      )}
      {selectedTab == "juz" && (
        <div className=" md:columns-2 lg:columns-3 mt-10 space-y-5">
          {sort == "asc"
            ? JuzsChs.map((juz: any, i: number) => (
                <JuzCard key={i} juz={juz} />
              ))
            : JuzsChs.slice(0)
                .reverse()
                .map((juz: any, i: number) => <JuzCard key={i} juz={juz} />)}
        </div>
      )}
    </div>
  );
};

export default TabSection;
