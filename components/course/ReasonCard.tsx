import React from "react";

const ReasonCard = (props: any) => {
  const { reason } = props;
  return (
    <div className="relative flex items-center border border-[#E0D2B4] rounded-3xl bg-[#04332A] lg:mx-6 my-2">
      <div
        className="absolute -left-10 border-2 w-24 h-24 flex items-center justify-center border-[#E0D2B4] rounded-full bg-[#04332A]"
        dangerouslySetInnerHTML={{
          __html: reason.icon,
        }}
      ></div>
      <div className="px-16 p-5 w-full">
        <h1 className="text-white font-semibold pb-2">{reason.title}</h1>
        <p className="text-[#E0D2B4] text-sm">{reason.txt}</p>
      </div>
    </div>
  );
};

export default ReasonCard;
