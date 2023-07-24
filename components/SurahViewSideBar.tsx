import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/router";

const SurahViewSideBar = (props: any) => {
  const { chapterID, juzID, pID } = props;
  const [search, setSearch] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");

  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://api.quran.com/api/v4/chapters?language=sv")
      .then(({ data }) => setChapters(data.chapters));

    setSelectedTab(router.pathname.split("/")[1]);
  }, [router]);

  const juzs = () => {
    let juzsEle: any = [];
    for (let index = 0; index < 30; index++) {
      juzsEle.push(
        <Link
          href={"/juz/" + (index + 1)}
          key={index}
          className={
            (juzID == index + 1 ? "bg-black " : "") + " rounded-lg px-2 py-1"
          }
        >
          Juz {index + 1}
        </Link>
      );
    }
    return juzsEle;
  };

  const pages = () => {
    let pageEle: any = [];
    for (let index = 0; index < 604; index++) {
      pageEle.push(
        <Link
          href={"/page/" + (index + 1)}
          key={index}
          className={
            (pID == index + 1 ? "bg-black " : "") + " rounded-lg px-2 py-1"
          }
        >
          page {index + 1}
        </Link>
      );
    }
    return pageEle;
  };

  return (
    <div
      id="sidebar"
      className="bg-[#012424] py-3 w-full top-0 h-[calc(100vh)] overflow-hidden flex flex-col z-50 transition-all duration-300 sticky left-0"
    >
      <div className="flex items-center gap-5 px-5">
        <div className="bg-[#001D1D] w-64 grid grid-cols-3 gap-2 divide-x divide-slate-700 rounded-full text-gray-300">
          <button
            className={
              (selectedTab == "surah" ? "bg-green-900 rounded-full" : "") +
              " text-white py-1 shadow-lg"
            }
            onClick={() => setSelectedTab("surah")}
          >
            Surah
          </button>
          <button
            className={
              (selectedTab == "juz" ? "bg-green-900 rounded-full" : "") +
              " text-white py-1 shadow-lg"
            }
            onClick={() => setSelectedTab("juz")}
          >
            Juz
          </button>
          <button
            className={
              (selectedTab == "page" ? "bg-green-900 rounded-full" : "") +
              " text-white py-1 shadow-lg"
            }
            onClick={() => setSelectedTab("page")}
          >
            Sida
          </button>
        </div>
        <RxCross2
          className="ml-auto text-white text-xl cursor-pointer"
          onClick={() => props.setShowSidebar(false)}
        />
      </div>
      {selectedTab == "surah" && (
        <div className="flex gap-3 flex-grow h-full overflow-scroll px-5">
          <div className="w-44a w-full">
            <div className="pr-2">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                className="w-full bg-[#001D1D] text-white rounded-md px-2 py-2 my-3 focus:outline-none"
                placeholder="Sök surah"
              />
            </div>
            <div className="overflow-y-auto text-white flex flex-col gap-1 pr-2">
              {chapters.map((chapter: any, i: number) => (
                <Link
                  href={"/surah/" + chapter.id}
                  key={i}
                  className={
                    (chapterID == chapter.id ? " bg-black " : "") +
                    (chapter.name_simple
                      .toLowerCase()
                      .match(search.toLowerCase()) ?? "hidden") +
                    " rounded-lg px-2 py-1"
                  }
                >
                  {chapter.id} {chapter.name_simple} (
                  {chapter.translated_name.name})
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedTab == "juz" && (
        <div className="flex gap-3 flex-grow h-full overflow-scroll px-5">
          <div className="w-44a w-full">
            <div className="overflow-y-auto text-white flex flex-col gap-1 pr-2 py-2">
              {juzs()}
            </div>
          </div>
        </div>
      )}
      {selectedTab == "page" && (
        <div className="flex gap-3 flex-grow h-full overflow-scroll px-5">
          <div className="w-44a w-full">
            <div className="overflow-y-auto text-white flex flex-col gap-1 pr-2 py-2">
              {pages()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurahViewSideBar;
