// these are all the blocks that require extra data through a getBlockProps function
import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next'
import type { BlocksQueryResult } from '~/api/sanity/queries'

export type GetBlockPropsFunctions<T> = Record<
  string,
  | ((
      block: BlocksQueryResult,
      page: T,
      context: GetServerSidePropsContext | GetStaticPropsContext,
    ) => Promise<Record<string, unknown>>)
  | undefined
>

// export your "getBlockProps" functions from each block here
export { getBlockProps as ChapterAndJuzList } from './ChapterAndJuzList'
export { getBlockProps as CourseList } from './CourseList'
export { getBlockProps as Surah } from './Surah'
export { getBlockProps as QuranReader } from './QuranReader'
export { getBlockProps as Tutors } from './Tutors'
