import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const SurahViewSideBar = (props: any) => {
  const { chpID } = props;
  const [search, setSearch] = useState("");
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.quran.com/api/v4/chapters?language=en")
      .then(({ data }) => setChapters(data.chapters));
  }, []);

  console.log(chapters);

  return (
    <div className="bg-[#012424] px-5 py-3 w-max sticky top-0 z-10">
      <div className="bg-gray-800 w-64 grid grid-cols-3 gap-2 divide-x divide-slate-700 rounded-full text-gray-300">
        <button className="text-white bg-green-900 rounded-full py-1 shadow-lg">
          Surah
        </button>
        <button className="">Juz</button>
        <button className="">Page</button>
      </div>
      <div className="flex gap-3">
        <div className="w-44a w-full">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className="w-full bg-gray-800 text-white rounded-md px-2 py-1 my-3 focus:outline-none"
            placeholder="Sök surah"
          />
          <div className="overflow-auto h-[calc(100vh)] text-white flex flex-col gap-1 pr-2">
            {chapters.map((chapter: any, i: number) => (
              <Link
                href={"/surah/view?chapter_id=" + chapter.id}
                key={i}
                className={
                  (chpID == chapter.id ? "bg-black " : "") +
                  (chapter.name_simple
                    .toLowerCase()
                    .match(search.toLowerCase()) ?? "hidden") +
                  " rounded-lg px-2 py-1"
                }
              >
                {chapter.id} {chapter.name_simple}
              </Link>
            ))}
          </div>
        </div>
        {/* <div className="w-32">
          <input
            type="search"
            className="w-full bg-[#1E3535] rounded-md px-2 py-1 my-3"
            placeholder="Sök surah"
          />
          <div className="overflow-auto h-[calc(100vh-10rem)]">
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
            <p>Surah 1</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SurahViewSideBar;
