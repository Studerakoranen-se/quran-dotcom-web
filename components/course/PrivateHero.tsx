import Image from "next/image";
import Link from "next/link";

const PrivateHero = () => {
  return (
    <div className="relative container flex gap-5 items-center justify-between my-10 pt-10">
      <div className="text-white z-10">
        <h1 className="font-elMessiri text-4xl">Private Classes</h1>
        <p className="py-5 text-lg text-justify">
          StuderaKoranen är en unik satsning vars syfte är att främja
          koranundervisning i Sverige. Vi erbjuder inspelade kurser,
          kursmaterial, koran-app, rådgivning och mycket mer!
        </p>
        <Link href={"#applyform"}>
          <div className="bg-white text-black rounded-full px-4 py-2 mt-5 w-max">
            Request a Private Class
          </div>
        </Link>
      </div>
      <div className="absolute md:static top-0 left-0 opacity-20 md:opacity-100">
        <Image
          width={2000}
          height={100}
          src={"/assets/private-teaching.png"}
          alt=""
        />
      </div>
    </div>
  );
};

export default PrivateHero;
