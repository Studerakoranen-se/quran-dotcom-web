import Image from 'next/image'
import Link from 'next/link'

const PrivateHero = () => {
  return (
    <div className="relative container flex gap-5 items-center justify-between my-10 pt-10">
      <div className="text-white z-10">
        <h1 className="font-elMessiri text-4xl">Privatundervisning</h1>
        <p className="py-5 text-lg text-justify">
          <ul className="list-disc">
            <li>
              Här kan man ansöka om privatundervisning med en utbildad koranlärare på distans.
              Kurserna äger rum via Zoom, Teams eller genom annan plattform efter överenskommelse
              med läraren.
            </li>
            <li>
              StuderaKoranen är endast en medlare mellan lärare och elever. Alla specifika frågor om
              lektionerna, betalning m.m tas med varje enskild lärare.{' '}
            </li>
            <li>
              Första lektionen är alltid gratis. Därefter meddelar varje elev sin kursledare om man
              vill fortsätta eller inte.
            </li>
          </ul>
        </p>
        <Link href={'#applyform'}>
          <div className="bg-white text-black rounded-full px-4 py-2 mt-5 w-max font-inter">
            Skicka förfrågan
          </div>
        </Link>
      </div>
      <div className="absolute md:static top-0 left-0 opacity-20 md:opacity-100">
        <Image width={2000} height={100} src={'/assets/private-teaching.png'} alt="" />
      </div>
    </div>
  )
}

export default PrivateHero
