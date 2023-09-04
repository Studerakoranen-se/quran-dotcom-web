import Head from 'next/head'
import * as React from 'react'
import axios from 'axios'
import { IoMdPlay } from 'react-icons/io'
import { IoChatbubble } from 'react-icons/io5'
import {
  BsBookHalf,
  BsThreeDots,
  BsPlayFill,
  BsFillPauseFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs'
import { RiMenuUnfoldFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import ReactAudioPlayer from 'react-audio-player'
import { GetServerSideProps } from 'next'
import { addToHistory, updateVerseCount } from '~/store/historySlice'
import SurahViewSideBar from '~/components/SurahViewSideBar'
import TopBar from '~/components/TopBar'
import NavBar from '~/components/NavBar'
import Bismillah from '~/components/quran/surah/Bismillah'
import { formatChapters } from '~/utils'

const SurahViewPage = (props: any) => {
  const { startAt, chapterID, locale } = props

  const dispatch = useDispatch()

  const [verses, setVerses] = React.useState<any>([])
  const [chapterInfo, setChapterInfo] = React.useState<any>([])
  const [visibleId, setVisibleId] = React.useState<string | null>(null)

  const [tafsir, setTafsir] = React.useState()

  const [currentVerse, setCurrentVerse] = React.useState<number>(0)

  const [audio, setAudio] = React.useState<any>()
  const [currentAudio, setCurrentAudio] = React.useState('')
  const [audioPlaying, setAudioPlaying] = React.useState(false)
  const [showControl, setShowControl] = React.useState(false)

  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleAudioEnded = (id: any) => {
    const audios = verses.map((verse: any) => verse.audio)

    const currentIndex = audios.indexOf(currentAudio)
    if (currentVerse === audios.length - 1) {
      setCurrentAudio('')
      setCurrentVerse(0)
    } else {
      setCurrentAudio(`https://audio.qurancdn.com/${audios[currentVerse].url}`)
      higLightText(`v${currentVerse + 1}`, audios[currentVerse].segments)
      setCurrentVerse(currentVerse + 1)
    }
  }
  const goToBeginning = (e: any) => {
    e.preventDefault()
    const element = document.getElementById('verse1')
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth', // Optional, smooth scrolling animation
      })
    }
  }

  const playWholeSurah = () => {
    const audios = verses.map((verse: any) => verse.audio)
    setCurrentAudio(`https://audio.qurancdn.com/${audios[0].url}`)
    audio.audioEl.current.play()

    return audios
  }

  const playAudio = () => {
    audio.audioEl.current.play()
    setAudioPlaying(true)
  }

  const pauseAudio = () => {
    audio.audioEl.current.pause()
    audio.audioEl.current.currentTime = 0
    setCurrentAudio('')
    setAudioPlaying(false)
  }

  const higLightText = (id: any, segment: any) => {
    const childs: any = document?.querySelector<HTMLElement>(`#${id}`)?.children
    segment.forEach((seg: any, i: any) => {
      setTimeout(() => {
        if (childs) {
          childs[i].style.color = '#10de5d'
        }
      }, segment[i][2])
      setTimeout(() => {
        if (childs) {
          childs[i].style.color = '#fff'
        }
      }, segment[i][3])
    })
  }

  React.useEffect(() => {
    if (chapterID) {
      axios
        .get(
          `https://api.quran.com/api/v3/chapters/${chapterID}/verses?recitation=1&translations=21&language=${locale}&text_type=words&per_page=1000&tafsirs=169,381,165,164`,
        )
        .then(({ data }) => setVerses(data.verses))

      // axios
      //   .get("https://api.quran.com/api/v3/chapters/" + chapterID)
      //   .then(({ data }) => {
      //     // setChapterInfo(data.chapter);
      //   });

      axios
        .get(`https://api.quran.com/api/v3/chapters/${chapterID}?language=${locale}`)
        .then(({ data }) => {
          setChapterInfo(data.chapter)
          data.chapter.verses_count = 1
          dispatch(addToHistory(formatChapters(data.chapter, locale)))
        })
    }
  }, [chapterID])

  React.useEffect(() => {
    // Get the element by its ID
    const targetElement = document.getElementById(`verse${startAt}`)
    if (targetElement) {
      const offsetTop = targetElement.offsetTop
      const windowHeight = window.innerHeight
      const targetHeight = targetElement.offsetHeight
      const scrollToPosition = offsetTop - windowHeight / 2 + targetHeight / 2

      window.scrollTo({ top: scrollToPosition, behavior: 'smooth' })
    }
  }, [verses])

  React.useEffect(() => {
    if (!containerRef.current || !verses) {
      // If the container or verses are not available yet, return early
      return
    }

    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.25,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matches = entry.target.id.match(/\d+/)

          dispatch(
            updateVerseCount({
              id: chapterID,
              verse_count: matches ? matches[0]! : 1,
            }),
          )

          setVisibleId(entry.target.id)
        }
      })
    }, options)

    const elements = containerRef.current.querySelectorAll("[id^='verse']")
    elements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [verses])

  const toggleSideBar = () => {
    const s = document.getElementById('sidebar')
    const os = document.getElementById('openSidebar')

    if (s?.classList.contains('hidden')) {
      s?.classList.remove('hidden')
      s?.classList.add('md:block')
      os?.classList.add('md:hidden')
    } else {
      s?.classList.add('hidden')
      s?.classList.remove('md:block')
      os?.classList.remove('md:hidden')
    }
  }

  const getTafsir = (verseID: number) => {
    axios
      .get(
        `https://api.quran.com/api/v3/chapters/${chapterID}/verses/${verseID}/tafsirs?language=${locale}`,
      )
      .then(({ data }) => {
        // setChapterInfo(data.chapter);
        console.log(data)
      })
  }
  console.log(verses)

  return (
    <React.Fragment>
      <Head>
        <title>Surah</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative font-inter bg-color1 flex flex-col min-h-screen scroll-smooth ">
        <TopBar />
        <NavBar />
        <div className="flex relative">
          <div
            id="sidebar"
            className={
              ' absolute md:static top-0 left-0 bg-[#012424] w-0 lg:w-96 transition-all duration-300'
            }
          >
            <SurahViewSideBar chapterID={chapterID} setShowSidebar={toggleSideBar} />
          </div>
          <div className="flex-grow container px-5">
            <ReactAudioPlayer
              src={currentAudio}
              autoPlay
              // controls
              ref={(element) => {
                setAudio(element)
              }}
              onPlay={() => {
                setAudioPlaying(true)
              }}
              onEnded={() => {
                setAudioPlaying(false)
                currentVerse === 0 || handleAudioEnded(currentVerse)
              }}
            />
            <RiMenuUnfoldFill
              id="openSidebar"
              className="md:hidden text-white text-xl mt-5 cursor-pointer"
              onClick={() => toggleSideBar()}
            />

            <div className="space-y-6 pt-10">
              <Bismillah bismillah_pre={chapterInfo?.bismillah_pre} />
              <div className="py-5">
                {audioPlaying ? (
                  <button
                    onClick={() => {
                      pauseAudio()
                    }}
                    className="text-[#E0D2B4] flex items-center gap-2 ml-auto"
                  >
                    <BsFillPauseFill /> pausa ljud
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentAudio(`https://audio.qurancdn.com/${verses[0].audio.url}`)
                      setCurrentVerse(1)
                      audio.audioEl.current.play()
                    }}
                    className="text-[#E0D2B4] flex items-center gap-2 ml-auto"
                  >
                    <BsPlayFill /> Spela upp ljud
                  </button>
                )}
              </div>
              {/* verse */}

              <div ref={containerRef}>
                {verses?.map((verse: any, i: number) => (
                  <div
                    key={i}
                    id={`verse${i + 1}`}
                    className="border-b border-green-800 pb-12 pt-12 flex justify-between gap-5"
                  >
                    <div className="w-10 text-white flex flex-col items-center gap-4">
                      <div className="">{verse.verse_key}</div>
                      {audioPlaying &&
                      currentAudio === `https://audio.qurancdn.com/${verse.audio.url}` ? (
                        <BsFillPauseFill
                          className="cursor-pointer"
                          onClick={() => {
                            pauseAudio()
                          }}
                        />
                      ) : (
                        <IoMdPlay
                          className="cursor-pointer"
                          onClick={() => {
                            setCurrentVerse(verse.verse_number)
                            setCurrentAudio(`https://audio.qurancdn.com/${verse.audio.url}`)
                            audio.audioEl.current.play()
                            setShowControl(true)
                            setAudioPlaying(true)
                            higLightText(`v${verse.verse_number}`, verse.audio.segments)
                          }}
                        />
                      )}

                      <IoChatbubble />
                      <BsBookHalf onClick={() => getTafsir(verse.verse_number)} />
                      <BsThreeDots />
                    </div>
                    <div className="flex-grow flex flex-col gap-5 justify-center px-10">
                      <div
                        id={`v${verse.verse_number}`}
                        className={
                          // (audioPlaying &&
                          // currentAudio ===
                          //   "https://audio.qurancdn.com/" + verse.audio.url
                          //   ? "currentPlaying"
                          //   : "") +
                          ' flex flex-wrap text-white font-scheherazade text-3xl gap-2'
                        }
                        dir="rtl"
                      >
                        {verse.words.map((word: any, i: number) => (
                          <button
                            onClick={() => {
                              setCurrentVerse(0)
                              setCurrentAudio(`https://audio.qurancdn.com/${word.audio.url}`)
                              audio.audioEl.current.play()
                            }}
                            key={i}
                            className={`${
                              word.char_type === 'end' ? '' : ''
                            } hover:!text-green-400 relative group flex flex-col gap-4 items-center leading-loose`}
                          >
                            {word.char_type === 'end' ? (
                              <div className="relative">
                                <p className="font-irishGrove w-5 text-center absolute top-[1rem] left-[.6rem] group-hover:text-[#E0D2B4] text-2xl">
                                  {word.text_madani}
                                </p>
                                <svg
                                  width="40"
                                  height="60"
                                  viewBox="0 0 49 60"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className=""
                                >
                                  <path
                                    d="M24.0179 52.6523C36.8485 52.6523 47.2499 42.651 47.2499 30.3138C47.2499 17.9767 36.8485 7.97538 24.0179 7.97538C11.1872 7.97538 0.785858 17.9767 0.785858 30.3138C0.785858 42.651 11.1872 52.6523 24.0179 52.6523Z"
                                    fill="#fff"
                                    className="group-hover:fill-[#fff]"
                                    stroke="black"
                                  />
                                  <path
                                    d="M24.0178 49.1446C34.8338 49.1446 43.6018 40.7138 43.6018 30.3138C43.6018 19.9139 34.8338 11.4831 24.0178 11.4831C13.2019 11.4831 4.43384 19.9139 4.43384 30.3138C4.43384 40.7138 13.2019 49.1446 24.0178 49.1446Z"
                                    fill="#04332A"
                                    stroke="black"
                                  />
                                  <path
                                    d="M38.6559 16.501C42.3452 18.1994 44.8283 17.3861 46.3997 15.3892C43.2009 14.894 40.3593 11.8389 37.5842 9.92385C31.5469 5.75856 27.9969 7.7897 24.0094 1.19819C20.0223 7.78859 16.4722 5.75745 10.435 9.92274C7.65906 11.8377 4.81861 14.8926 1.62219 15.3881C3.19383 17.385 5.67685 18.1983 9.36594 16.4999C13.4878 20.7892 14.8468 9.40841 24.0094 16.8825C33.1724 9.40966 34.5314 20.7905 38.6544 16.5011L38.6559 16.501Z"
                                    fill="url(#paint0_linear_629_2354)"
                                    className="group-hover:fill-[#fff]"
                                    stroke="black"
                                  />
                                  <path
                                    d="M24.0178 12.6277C25.4812 12.6277 26.6674 11.4871 26.6674 10.08C26.6674 8.67295 25.4812 7.53231 24.0178 7.53231C22.5545 7.53231 21.3682 8.67295 21.3682 10.08C21.3682 11.4871 22.5545 12.6277 24.0178 12.6277Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M17.9476 10.6944C15.0495 11.7074 13.57 12.4273 11.5954 13.7785L17.9476 10.6944Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M17.9476 10.6944C15.0495 11.7074 13.57 12.4273 11.5954 13.7785"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M30.0113 10.6944C32.9094 11.7074 34.3889 12.4273 36.3634 13.7785L30.0113 10.6944Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M30.0113 10.6944C32.9094 11.7074 34.3889 12.4273 36.3634 13.7785"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M38.6559 43.499C42.3452 41.8006 44.8283 42.6139 46.3997 44.6108C43.201 45.106 40.3594 48.1611 37.5842 50.0762C31.5469 54.2414 27.9969 52.2103 24.0094 58.8018C20.0223 52.2114 16.4722 54.2426 10.435 50.0773C7.65906 48.1623 4.81861 45.1074 1.62219 44.6119C3.19383 42.615 5.67685 41.8017 9.36594 43.5002C13.4878 39.2108 14.8468 50.5916 24.0094 43.1175C33.1724 50.5903 34.5314 39.2095 38.6544 43.4989L38.6559 43.499Z"
                                    fill="url(#paint1_linear_629_2354)"
                                    stroke="black"
                                    className="group-hover:fill-[#fff]"
                                  />
                                  <path
                                    d="M24.0178 47.3723C25.4812 47.3723 26.6674 48.5129 26.6674 49.92C26.6674 51.3271 25.4812 52.4677 24.0178 52.4677C22.5545 52.4677 21.3682 51.3271 21.3682 49.92C21.3682 48.5129 22.5545 47.3723 24.0178 47.3723Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M17.9476 49.3056C15.0495 48.2926 13.57 47.5727 11.5954 46.2215L17.9476 49.3056Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M17.9476 49.3056C15.0495 48.2926 13.57 47.5727 11.5954 46.2215"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M30.0113 49.3056C32.9094 48.2926 34.3889 47.5727 36.3634 46.2215L30.0113 49.3056Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M30.0113 49.3056C32.9094 48.2926 34.3889 47.5727 36.3634 46.2215"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_629_2354"
                                      x1="1.62219"
                                      y1="3.64343"
                                      x2="1.62219"
                                      y2="15.8697"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#fff" />
                                      <stop offset="1" stopColor="#fff" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint1_linear_629_2354"
                                      x1="1.62219"
                                      y1="56.3566"
                                      x2="1.62219"
                                      y2="44.1304"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#fff" />
                                      <stop offset="1" stopColor="#fff" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </div>
                            ) : (
                              <p>{word.text_madani}</p>
                            )}

                            <span className="hidden group-hover:block text-black text-lg w-max absolute -top-[4rem] right-0 bg-green-100 rounded-lg px-2 font-inter">
                              <p>{word.translation.text}</p>
                              <p className="text-lg">{word.transliteration.text}</p>
                            </span>
                          </button>
                        ))}
                      </div>
                      <p className="text-white">{verse.translations[0].text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed right-5 bottom-10">
          <BsFillArrowUpCircleFill
            className="text-white text-5xl cursor-pointer"
            onClick={goToBeginning}
          />
        </div>
        {/* <Footer />
        <CopyrightSection /> */}
      </main>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx
  const { start_at, chapterID } = ctx.query

  return { props: { startAt: start_at || 1, chapterID, locale } }
}

export default SurahViewPage
