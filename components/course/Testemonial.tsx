import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const Testemonial = () => {
  const reviews = [
    {
      img: "/assets/students/std1.webp",
      name: "John Coastal",
      comment:
        "Good layout, professional and educational material and good follow-up in the form of homework and tests",
    },
    {
      img: "/assets/students/std1.webp",
      name: "John Coastal",
      comment:
        "Good layout, professional and educational material and good follow-up in the form of homework and tests",
    },
    {
      img: "/assets/students/std1.webp",
      name: "John Coastal",
      comment:
        "Good layout, professional and educational material and good follow-up in the form of homework and tests",
    },
    {
      img: "/assets/students/std1.webp",
      name: "John Coastal",
      comment:
        "Good layout, professional and educational material and good follow-up in the form of homework and tests",
    },
  ];
  return (
    <div>
      <div className="">
        <Carousel>
          {reviews.map((review: any, i: number) => (
            <div
              key={i}
              className="flex justify-center items-center border border-[#0BC7BA]"
            >
              <div className="relative w-10 h-10">
                <Image fill src={review.img} alt="" />
              </div>
              <div className="">
                <h1>{review.name}</h1>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Testemonial;
