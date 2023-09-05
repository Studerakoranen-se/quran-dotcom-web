import dynamic from 'next/dynamic'

export const ChapterAndJuzList = dynamic(() => import(/* webpackChunkName: "blocks/ChapterAndJuzList" */ './ChapterAndJuzList')) // prettier-ignore
export const CourseHero = dynamic(() => import(/* webpackChunkName: "blocks/CourseHero" */ './CourseHero')) // prettier-ignore
export const CourseList = dynamic(() => import(/* webpackChunkName: "blocks/CourseList" */ './CourseList')) // prettier-ignore
export const Courses = dynamic(() => import(/* webpackChunkName: "blocks/Courses" */ './Courses')) // prettier-ignore
export const Editorial = dynamic(() => import(/* webpackChunkName: "blocks/Editorial" */ './Editorial')) // prettier-ignore
export const Form = dynamic(() => import(/* webpackChunkName: "blocks/Form" */ './Form')) // prettier-ignore
export const Hero = dynamic(() => import(/* webpackChunkName: "blocks/Hero" */ './Hero')) // prettier-ignore
export const QuranBanner = dynamic(() => import(/* webpackChunkName: "blocks/QuranBanner" */ './QuranBanner')) // prettier-ignore
export const RecentReading = dynamic(() => import(/* webpackChunkName: "blocks/RecentReading" */ './RecentReading')) // prettier-ignore
export const Steps = dynamic(() => import(/* webpackChunkName: "blocks/Steps" */ './Steps')) // prettier-ignore
export const Surah = dynamic(() => import(/* webpackChunkName: "blocks/Surah" */ './Surah')) // prettier-ignore
export const Tutors = dynamic(() => import(/* webpackChunkName: "blocks/Tutors" */ './Tutors')) // prettier-ignore
export const FeatureList = dynamic(() => import(/* webpackChunkName: "blocks/FeatureList" */ './FeatureList')) // prettier-ignore
