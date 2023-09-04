import blocks from './blocks'

export default {
  Home: {
    headerMode: 'auto',
    blocks: [
      {
        name: 'Hero',
        props: blocks.Hero,
      },
      {
        name: 'QuranBanner',
        props: blocks.QuranBanner,
      },
      {
        name: 'RecentReading',
        props: blocks.RecentReading,
      },
      {
        name: 'ChapterAndJuzList',
        props: blocks.ChapterAndJuzList,
      },
      {
        name: 'Content',
        props: blocks.Content,
      },
    ],
  },
  Surah: {
    blocks: [
      {
        name: 'Surah',
        props: blocks.Surah,
      },
    ],
  },
  Article: {
    blocks: [
      {
        name: 'Media',
        props: blocks.Media,
      },
      {
        name: 'Content',
        props: blocks.Content,
      },
    ],
  },
  NotFound: {
    blocks: [
      {
        name: 'ErrorBlock',
        props: blocks.ErrorBlock,
      },
    ],
  },
}
