import React from "react";
import Head from "next/head";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import CopyrightSection from "../../components/CopyrightSection";
import YouTube from "react-youtube";

const SingleCoursePage = () => {
  return (
    <>
      <Head>
        <title>Studerakoranen</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-inter bg-color1 overflow-x-hidden">
        <TopBar />
        <NavBar />
        <div className="max-w-5xl px-5 mx-auto grid grid-cols-12">
          <div className="text-white col-span-8 py-10">
            <h1 className="text-2xl font-elMessiri py-2">Qaidah Nooraniyyah</h1>
            <p className="">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or
            </p>
            <YouTube videoId="XC62pWvw4b0" />
            <div className=""></div>
          </div>
          <div className=""></div>
        </div>
        <Footer />
        <CopyrightSection />
      </main>
    </>
  );
};

export default SingleCoursePage;
