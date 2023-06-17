import Image from "next/image";
import Link from "next/link";

const PrivateHero = () => {
  return (
    <div className="relative container flex gap-5 items-center justify-between my-10 pt-10">
      <div className="text-white z-10">
        <h1 className="font-elMessiri text-4xl">Privatundervisning</h1>
        <p className="py-5 text-lg text-justify">
          Här kan man skicka en ansökan om man vill studera Koranen med en utbildad kursledare på distans.
          Kurserna äger run via Zoom, Teams eller genom en annan platform efter överenskommelse med läraren.
          StuderaKoranen är endast medlare mellan lärare och elever. Alla specifika frågor om lektionerna, betalning m.m tas med varje enskild lärare.
          Första lektionen är alltid gratis. Därefter meddelar varje elev sin kursledare om man vill fortsätta eller inte.
        </p>
        <Link href={"#applyform"}>
          <div className="bg-white text-black rounded-full px-4 py-2 mt-5 w-max font-inter">
            Skicka förfrågan
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
