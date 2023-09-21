import * as React from 'react'
import { styled } from '@mui/material/styles'
import { useI18n } from '~/contexts'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { RouterLink } from '~/containers'
import { SCROLL_TO_NEAREST_ELEMENT, useScrollToElement } from '~/hooks/useScrollToElement'
import { getSurahNavigationUrl } from '~/utils'

const BREAKPOINT_KEY = 'sm'

const QuranReaderDrawerRoot = styled('div')(({ theme }) => ({
  width: '100%',
}))

const QuranReaderScrollContainer = styled('div')(({ theme }) => ({
  ...theme.mixins.scrollable,
  ...theme.mixins.scrollbars,
  display: 'inherit',
  flexDirection: 'inherit',
  flexGrow: 1,
  paddingBottom: 'var(--ikas-toolbar-spacing)',
  height: 'calc(100vh)',
  marginTop: theme.spacing(2),
}))

const PreviewContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}))

const StyledRouterLink = styled(RouterLink)<{ ownerState: { href?: string; isActive: boolean } }>(
  ({ theme, ownerState }) => ({
    ...(ownerState?.isActive && {
      color: theme.vars.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
    }),
  }),
)

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
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

type QuranReaderDrawerProps = {
  chapterId: number
  chapters: Chapter[]
  juzs: {
    id?: number
    firstVerseId: number
    juzNumber: number
    lastVerseId: number
    versesCount: number
  }[]
}

const QuranReaderDrawer = React.memo(function QuranReaderDrawer(props: QuranReaderDrawerProps) {
  const { chapterId, chapters, juzs } = props

  const { t } = useI18n()

  const [scrollTo, selectedChapterRef] =
    useScrollToElement<HTMLDivElement>(SCROLL_TO_NEAREST_ELEMENT)

  const [view, setView] = React.useState(0)

  const tabs = React.useMemo(
    () => [
      { title: 'Surah', value: 0 },
      { title: 'Juz', value: 1 },
    ],
    [],
  )

  const onTabSelected = (event: React.SyntheticEvent, newView) => {
    setView(newView)
  }

  React.useEffect(() => {
    scrollTo()
  }, [chapterId, scrollTo])

  return (
    <QuranReaderDrawerRoot>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={view}
          onChange={onTabSelected}
          aria-label="Quran Tabs"
          sx={{
            ' .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: '3px',
            },
          }}
        >
          {tabs?.map((tab, idx) => (
            <Tab
              key={idx}
              label={tab.title}
              id={`quran-tab-${idx}`}
              value={tab.value}
              sx={{
                color: 'black !important',
                mr: 1,
              }}
            />
          ))}
        </Tabs>
      </Box>
      <QuranReaderScrollContainer>
        <CustomTabPanel value={view} index={0}>
          <PreviewContainer>
            {chapters.map((chapter: any, i: number) => (
              <StyledRouterLink
                key={i}
                href={getSurahNavigationUrl(`surah/${chapter.id}`)}
                ownerState={{
                  isActive: chapter.id.toString() === chapterId,
                }}
                shouldPrefetch={false}
                // className={`${
                //   Number(chapterId) === Number(chapter.id) ? ' text-red' : ''
                //   // (chapter.name_simple.toLowerCase().match(search.toLowerCase()) ?? 'hidden')
                // } rounded-lg px-2 py-1`}
              >
                <Typography
                  component="span"
                  sx={{ fontWeight: 'fontWeightBold' }}
                  ref={chapter.id.toString() === chapterId ? selectedChapterRef : null}
                >
                  {chapter.id}
                </Typography>
                {` - `}
                {chapter.nameSimple} ({chapter.translatedName})
              </StyledRouterLink>
            ))}
          </PreviewContainer>
        </CustomTabPanel>

        <CustomTabPanel value={view} index={1}>
          <PreviewContainer>
            {juzs.map((juz: any, i: number) => (
              <RouterLink
                key={i}
                href={`/juz/${juz.id}`}
                className={`${
                  i + 1 === juz.id ? ' text-red' : ''
                  // (chapter.name_simple.toLowerCase().match(search.toLowerCase()) ?? 'hidden')
                } rounded-lg px-2 py-1`}
              >
                Juz {juz.id}
              </RouterLink>
            ))}
          </PreviewContainer>
        </CustomTabPanel>
      </QuranReaderScrollContainer>
    </QuranReaderDrawerRoot>
  )
})

export default QuranReaderDrawer
