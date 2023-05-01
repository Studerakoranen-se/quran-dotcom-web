import React from "react";
import { useSelector } from "react-redux";
import RecentCard from "./RecentCard";

const RecentSection = () => {
  const histories = useSelector((state: any) => state.history?.recentSurahs);
  console.log("h", histories);

  return (
    <div className="container text-white py-5 px-5">
      <h1 className="text-center text-xl">Senast visade</h1>
      <div className="flex flex-wrap gap-5 justify-center py-5">
        {histories.length > 0 &&
          histories.map((history: any, i: number) => (
            <RecentCard key={i} data={history} />
          ))}
      </div>
    </div>
  );
};

export default RecentSection;
