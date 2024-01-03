import * as React from 'react'
import { Box, ButtonBase, styled, Typography } from '@mui/material'
import { useI18n } from '~/contexts'
import { Tabs, ArrowDropDownIcon } from '~/components'
import SurahPreview from './partials/SurahPreview'
import JuzPreview from './partials/JuzPreview'
import RevelationOrderView from './partials/RevelationOrderView'

const ChapterAndJuzListRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  padding: 'var(--cia-container-spacing)',
}))

const ChapterAndJuzListMain = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('xl'),
}))

const ChapterSorter = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBlockStart: 'var(--spacing-xsmall)',
  justifyContent: 'flex-end',
  alignItems: 'baseline',
  marginTop: theme.spacing(2),
}))

const PreviewContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridGap: 20,
  marginTop: 12,
  marginBottom: 24,
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}))

const PreviewContainer2 = styled('div')(({ theme }) => ({
  columnGap: 16,
  marginTop: 12,
  marginBottom: 24,
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
  ...theme.typography.body2,
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
  locale: string
  chapters: Chapter[]
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

const MOST_VISITED_CHAPTERS = {
  1: true,
  2: true,
  3: true,
  4: true,
  18: true,
  32: true,
  36: true,
  55: true,
  56: true,
  67: true,
}

function ChapterAndJuzList(props: ChapterAndJuzListProps) {
  const { chapters = [], locale } = props

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
      { title: t(__translationGroup)`Surah`, value: 0 },
      { title: t(__translationGroup)`Juz`, value: 1 },
      { title: t(__translationGroup)`RevelationOrder`, value: 2 },
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

  const onTabSelected = (e, newView) => {
    setView(newView)
  }

  return (
    <ChapterAndJuzListRoot>
      <ChapterAndJuzListMain>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {/* @ts-ignore */}
          <Tabs tabs={tabs} selected={view} onSelect={onTabSelected} />
        </Box>

        <ChapterSorter>
          <Typography sx={{ textTransform: 'uppercase' }} variant="body2">
            Sort:
          </Typography>
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
              <SurahPreview
                key={i}
                href={`/surah/${chapter.id}`}
                shouldPrefetch={MOST_VISITED_CHAPTERS[Number(chapter.id)] === true}
                chapterId={Number(chapter.id)}
                description={`${chapter.versesCount} Ayahs`}
                surahName={chapter.transliteratedName}
                surahNumber={Number(chapter.id)}
                translatedSurahName={chapter.translatedName as string}
                // isMinimalLayout={shouldUseMinimalLayout(lang)}
              />
            ))}
          </PreviewContainer>
        </CustomTabPanel>

        <CustomTabPanel value={view} index={1}>
          <PreviewContainer2>
            <JuzPreview isDescending={sortBy === Sort.DESC} />
          </PreviewContainer2>
        </CustomTabPanel>

        <CustomTabPanel value={view} index={2}>
          <PreviewContainer>
            {/* @ts-ignore */}
            <RevelationOrderView isDescending={sortBy === Sort.DESC} chapters={chapters} />
          </PreviewContainer>
        </CustomTabPanel>
      </ChapterAndJuzListMain>
    </ChapterAndJuzListRoot>
  )
}

export default ChapterAndJuzList
