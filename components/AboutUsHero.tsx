import Image from "next/image";

const AboutUsHero = () => {
  return (
    <div className="bg-[url('/assets/hero-img.png')] bg-cover bg-no-repeat bg-center">
      <div className="h-[38rem] bg-gradient-to-b from-[#001D1D] to-[#053A3A] via-[#043b3b33] bg-blend-overlay text-white flex flex-col justify-center items-center">
        <div className="container px-5 text-center">
          <h1 className="font-elMessiri text-5xl">What is Study the Koran?</h1>
          <p className="pt-5 font-light">
            StuderaKoranen is a non-profit organization that was launched in
            2023 with the goal of offering Swedish Muslims professional Koran
            teaching.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsHero;
