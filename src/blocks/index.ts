import dynamic from 'next/dynamic'

export const Hero = dynamic(() => import(/* webpackChunkName: "blocks/Hero" */ './Hero')) // prettier-ignore
export const QuranBanner = dynamic(() => import(/* webpackChunkName: "blocks/QuranBanner" */ './QuranBanner')) // prettier-ignore
export const RecentReading = dynamic(() => import(/* webpackChunkName: "blocks/RecentReading" */ './RecentReading')) // prettier-ignore
export const ChapterAndJuzList = dynamic(() => import(/* webpackChunkName: "blocks/ChapterAndJuzList" */ './ChapterAndJuzList')) // prettier-ignore
export const Surah = dynamic(() => import(/* webpackChunkName: "blocks/Surah" */ './Surah')) // prettier-ignore
