import { styled } from '@mui/material'
import { RouterLink } from '~/containers'
import { getChapterData } from '~/utils'
import SurahPreview from './SurahPreview'

const JuzPreviewRoot = styled('div')(({ theme }) => ({
  borderRadius: 4,
  paddingBlockStart: 13,
  paddingBlockEnd: 13,
  paddingInlineStart: 13,
  paddingInlineEnd: 13,
  breakInside: 'avoid-column',
  backgroundColor: theme.palette.mode === 'light' ? '#f1f1f1' : theme.vars.palette.primary.dark,
}))

const JuzPreviewItem = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  paddingBottom: 5,
}))

const JuzPreviewSurah = styled('div')(() => ({
  '& > * + *': {
    marginTop: 20,
  },
}))

const SurahPreviewContainer = styled('div')(({ theme }) => ({
  backgroundColor:
    theme.mode === 'light' ? theme.vars.palette.primary.main : theme.vars.palette.background.paper,
}))

const JuzRouterLink = styled(RouterLink)({
  textDecoration: 'underline',
})

const JuzPreview = (props: any) => {
  const { chapters, verseMapping, juzNumber } = props

  const chapterIds = Object.keys(verseMapping)

  return (
    <JuzPreviewRoot>
      <JuzPreviewItem className="flex items-end justify-between pb-5">
        <RouterLink href={`/juz/${juzNumber}`}>Juz {juzNumber}</RouterLink>
        <JuzRouterLink href={`/juz/${juzNumber}`}>Read Juz</JuzRouterLink>
      </JuzPreviewItem>
      <JuzPreviewSurah>
        {chapterIds.map((chapterId) => {
          // @ts-ignore
          const chapter = getChapterData(chapters, chapterId - 1)

          // eslint-disable-next-line no-console
          console.log('chapterId', chapterId)
          return (
            <SurahPreviewContainer>
              <SurahPreview key={chapterId} chapter={chapter} />
            </SurahPreviewContainer>
          )
        })}
      </JuzPreviewSurah>
    </JuzPreviewRoot>
  )
}

export default JuzPreview
