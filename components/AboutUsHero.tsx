import Image from "next/image";

const AboutUsHero = () => {
  return (
    <div className="bg-[url('/assets/hero-img.png')] bg-cover bg-no-repeat bg-center">
      <div className="h-[38rem] bg-gradient-to-b from-[#001D1D] to-[#053A3A] via-[#043b3b33] bg-blend-overlay text-white flex flex-col justify-center items-center">
        <div className="container px-5 text-center">
          <h1 className="font-elMessiri text-5xl">Vad är StuderaKoranen?</h1>
          <p className="pt-5 font-light">
            StuderaKoranen är en ideell organisationen som lanserades under 2023 med målet att erbjuda
            svenska muslimer professionell koran undervisning
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsHero;
