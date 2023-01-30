import React from "react";
import RecentCard from "./RecentCard";

const RecentSection = () => {
  return (
    <div className="container text-white py-5 px-5">
      <h1>Senast visade</h1>
      <div className="flex flex-wrap gap-5 py-5">
        <RecentCard />
        <RecentCard />
      </div>
    </div>
  );
};

export default RecentSection;
