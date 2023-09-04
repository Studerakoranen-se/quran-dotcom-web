import * as React from 'react'
import { Box, ButtonBase, styled, Tab, Tabs, Typography } from '@mui/material'
import { useI18n } from '~/contexts'
import SurahPreview from './partials/SurahPreview'
import JuzPreview from './partials/JuzPreview'
import { ArrowDropDownIcon } from '~/components'

const ChapterAndJuzListRoot = styled('section')(({ theme }) => ({
  position: 'relative',
}))

const ChapterAndJuzListMain = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
}))

const ChapterSorter = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBlockStart: 'var(--spacing-xsmall)',
  justifyContent: 'flex-end',
  alignItems: 'baseline',
}))

const PreviewContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridGap: 20,
  marginTop: 40,
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}))

const PreviewContainer2 = styled('div')(({ theme }) => ({
  columnGap: 16,
  marginTop: 40,
  [theme.breakpoints.up('md')]: {
    columnCount: 2,
  },
  [theme.breakpoints.up('lg')]: {
    columnCount: 3,
  },
  '& > * + *': {
    marginTop: 20,
  },
}))

const ChapterSortByValue = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textTransform: 'uppercase',
  cursor: 'pointer',

  '& > span': {
    display: 'flex',
    alignItems: 'center',
  },

  '& > .rotate180 > svg': {
    transform: 'rotate(180deg)',
  },

  '& > span > svg': {
    width: 'var(--spacing-small)',
    marginInlineStart: 'var(--spacing-xxsmall)',
    transition: 'transform var(--transition-regular)',
  },
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

enum Sort {
  ASC = 'ascending',
  DESC = 'descending',
}

type ChapterAndJuzListProps = {
  chapters: Chapter[]
  juzs: {
    id?: number
    firstVerseId: number
    juzNumber: number
    lastVerseId: number
    versesCount: number
  }[]
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

function ChapterAndJuzList(props: ChapterAndJuzListProps) {
  const { chapters = [], juzs = [] } = props

  const { t } = useI18n()
  const [sortBy, setSortBy] = React.useState(Sort.ASC)
  const [view, setView] = React.useState(0)

  const onSort = () => {
    setSortBy((prevValue) => {
      const newValue = prevValue === Sort.DESC ? Sort.ASC : Sort.DESC
      return newValue
    })
  }

  const tabs = React.useMemo(
    () => [
      { title: 'Surah', value: 0 },
      { title: 'Juz', value: 1 },
    ],
    [t],
  )

  const sortedChapters = React.useMemo(
    () =>
      sortBy === Sort.DESC
        ? chapters.slice().sort((a, b) => Number(b.id) - Number(a.id))
        : chapters,
    [sortBy, chapters],
  )

  const sortedJuzIds = React.useMemo(
    () => (sortBy === Sort.DESC ? juzs.slice(0).reverse() : juzs),
    [sortBy, juzs],
  )

  const onTabSelected = (event: React.SyntheticEvent, newView) => {
    setView(newView)
  }

  const getChaptersByJuz = (juzs: any, chapters: any) => {
    const juzsWithChapters: any = []

    juzs.forEach((juz: any) => {
      const chapterIDs = Object.keys(juz.verseMapping)
      const chapterD: any = []

      chapters.forEach((chapter: any) => {
        if (chapterIDs.includes(chapter.id.toString())) {
          chapterD.push(chapter)
        }
      })
      juzsWithChapters.push({
        juz,
        chapters: chapterD,
      })
    })

    return juzsWithChapters
  }

  const juzsChs = getChaptersByJuz(juzs, sortedChapters)

  return (
    <ChapterAndJuzListRoot>
      <ChapterAndJuzListMain>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={view} onChange={onTabSelected} aria-label="Quran Tabs">
            {tabs?.map((tab, idx) => (
              <Tab key={idx} label={tab.title} id={`quran-tab-${idx}`} value={tab.value} />
            ))}
          </Tabs>
        </Box>

        <ChapterSorter>
          <Typography sx={{ textTransform: 'uppercase' }}>Sort:</Typography>
          <ChapterSortByValue
            onClick={onSort}
            role="button"
            // onKeyPress={onSort}
            // tabIndex={0}
          >
            <span>Sort By</span>
            <span className={sortBy === Sort.ASC ? 'rotate180' : ''}>
              <ArrowDropDownIcon />
            </span>
          </ChapterSortByValue>
        </ChapterSorter>

        <CustomTabPanel value={view} index={0}>
          <PreviewContainer>
            {sortedChapters.map((chapter: any, i: number) => (
              <SurahPreview key={i} chapter={chapter} />
            ))}
          </PreviewContainer>
        </CustomTabPanel>
        <CustomTabPanel value={view} index={1}>
          <PreviewContainer2>
            {sortedJuzIds.map((juzEntry: any, i: number) => (
              <JuzPreview key={i} chapters={chapters} {...juzEntry} />
            ))}
          </PreviewContainer2>
        </CustomTabPanel>
      </ChapterAndJuzListMain>
    </ChapterAndJuzListRoot>
  )
}

export default ChapterAndJuzList
