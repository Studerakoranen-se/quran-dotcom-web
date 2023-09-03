import * as React from 'react'
import Head from 'next/head'
import NavBar from '~/components/NavBar'
import TopBar from '~/components/TopBar'
import Footer from '~/components/Footer'
import CopyrightSection from '~/components/CopyrightSection'

const TeacherListPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Studerakoranen</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-inter bg-color1 overflow-x-hidden flex flex-col min-h-screen">
        <TopBar />
        <NavBar />
        <div className="flex-grow">List of teachers</div>
        <Footer />
        <CopyrightSection />
      </main>
    </React.Fragment>
  )
}

export default TeacherListPage