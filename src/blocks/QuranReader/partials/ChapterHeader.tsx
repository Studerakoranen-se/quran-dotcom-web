import * as React from 'react'
import { Box } from '@mui/material'
import { Bismillah as BismillahIcon } from '~/components/icons'
import ChapterIconContainer, {
  ChapterIconsSize,
} from '~/components/ChapterIcon/partials/ChapterIconContainer'
import useIntersectionObserver from '~/hooks/useObserveElement'

type ChapterHeaderProps = {
  chapterId: string
  pageNumber: number
  hizbNumber: number
}

const CHAPTERS_WITHOUT_BISMILLAH = ['1', '9']

function ChapterHeader(props: ChapterHeaderProps) {
  const { chapterId, pageNumber, hizbNumber } = props

  const headerRef = React.useRef(null)
  /**
   * the intersection observer is needed so that we know that the first verse
   * of the current chapter is being read when the ChapterHeader appears within
   * the intersection observer root's borders.
   */
  useIntersectionObserver(headerRef, 'quranReaderObserver')

  return (
    <Box
      ref={headerRef}
      data-verse-key={`${chapterId}:1`}
      data-page={pageNumber}
      data-chapter-id={chapterId}
      data-hizb={hizbNumber}
      sx={{
        textAlign: 'center',
        ...(!CHAPTERS_WITHOUT_BISMILLAH.includes(chapterId) && {
          mt: 4,
        }),
      }}
    >
      <div>
        <div>
          <ChapterIconContainer chapterId={chapterId} size={ChapterIconsSize.Mega} hasSurahPrefix />
        </div>
      </div>

      <div>
        {!CHAPTERS_WITHOUT_BISMILLAH.includes(chapterId) && (
          <BismillahIcon
            sx={{
              width: '220px',
              height: '45px',
            }}
          />
        )}
      </div>
    </Box>
  )
}

export default ChapterHeader
