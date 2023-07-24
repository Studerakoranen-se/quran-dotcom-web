import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NavBar = (props: any) => {
  const { overlay } = props;
  const [isScrolled, setScrolled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const devmode = localStorage.getItem("devmode");
    if (!devmode || devmode !== "truefornovatech") {
      router.push("/maintenance");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.pageYOffset > 250) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  console.log(isScrolled);

  return (
    <nav
      className={
        (isScrolled ? " !h-[5rem] " : "h-[8.5rem]") +
        (overlay ? " bg-opacity-50 absolute top-10 " : " sticky top-0 ") +
        " w-full z-50 bg-color1 text-white px-5 h-[8.5rem] left-0 transition-all duration-300 hidden md:block"
      }
      style={
        overlay
          ? {
              background:
                "linear-gradient(180deg, #001D1D -0.35%, rgba(4, 59, 59, 0) 48.43%, #053A3A 100.17%)",
            }
          : {}
      }
    >
      <div className="container flex items-center justify-between h-full">
        <Link href={"/"} className="">
          <Image width={103} height={117} src="/assets/logo.png" alt="" />
        </Link>

        <div className="flex items-center justify-end">
          <div className="hidden md:flex gap-[3rem] text-sm mr-[70px] text-[18px] font-inter">
            <Link href={"/"}>HEM</Link>
            <Link href={"/course"}>KURSER</Link>
            <Link href={"/about-us"}>OM OSS</Link>
            <Link href={"/"}>KONTAKTA OSS</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
