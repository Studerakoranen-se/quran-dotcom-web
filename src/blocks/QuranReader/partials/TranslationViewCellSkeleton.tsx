import range from 'lodash/range'
import classNames from 'clsx'
import { useSelector, shallowEqual } from 'react-redux'
import { Box, Button } from '@mui/material'
import Skeleton from '~/components/Skeleton'
import useGetQueryParamOrReduxValue from '~/hooks/useGetQueryParamOrReduxValue'
import { selectQuranReaderStyles } from '~/store/slices/QuranReader/styles'
import QueryParam from '~/types/QueryParam'
import { QuranFont } from '~/types/QuranReader'
import { getFontClassName } from '~/utils/fontFaceHelper'
import cellStyles from './TranslationViewCell.module.scss'
import skeletonStyles from './TranslationViewSkeleton.module.scss'
import verseTextStyles from './VerseText.module.scss'

const TRANSLATION_TEXT_SAMPLE =
  'He has revealed to you ˹O Prophet˺ the Book in truth, confirming what came before it, as He revealed the Torah and the Gospel'
const TRANSLATION_AUTHOR_SAMPLE = '— Dr. Mustafa Khattab, the Clear Quran'

interface Props {
  hasActionMenuItems?: boolean
}

function TranslationViewCellSkeleton({ hasActionMenuItems = true }: Props) {
  const { value: selectedTranslations }: { value: number[] } = useGetQueryParamOrReduxValue(
    QueryParam.Translations,
  )
  const { quranFont, quranTextFontScale, translationFontScale, mushafLines } = useSelector(
    selectQuranReaderStyles,
    shallowEqual,
  )

  const isTajweedFont = quranFont === QuranFont.Tajweed

  return (
    <div className={classNames(cellStyles.cellContainer, skeletonStyles.cellContainer)}>
      <div className={cellStyles.actionContainer}>
        <div className={cellStyles.actionContainerLeft}>
          {range(0, 4).map((index) => (
            <Skeleton key={index} className={skeletonStyles.actionItem}>
              <Button size="small" />
            </Skeleton>
          ))}
        </div>
        {hasActionMenuItems && (
          <div className={cellStyles.actionContainerRight}>
            <Skeleton className={cellStyles.actionItem}>
              <Button size="small" />
            </Skeleton>
          </div>
        )}
      </div>

      {/* We're not using VersePreview as Skeleton's children here
      because it has layout shift problem when loading the font. Which is not ideal for skeleton */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
        }}
      >
        <Skeleton
          className={classNames(skeletonStyles.verseContainer, cellStyles.arabicVerseContainer, {
            [verseTextStyles[getFontClassName(quranFont, quranTextFontScale, mushafLines)]]:
              !isTajweedFont,
          })}
        />
        <div
          className={classNames(
            cellStyles.verseTranslationsContainer,
            skeletonStyles[`translation-font-size-${translationFontScale}`],
          )}
        >
          {selectedTranslations.map((translation) => (
            <span key={translation}>
              <div>
                <Skeleton className={classNames(skeletonStyles.translationText)}>
                  {TRANSLATION_TEXT_SAMPLE}
                </Skeleton>
              </div>
              <div>
                <Skeleton className={classNames(skeletonStyles.translationAuthor)}>
                  {TRANSLATION_AUTHOR_SAMPLE}
                </Skeleton>
              </div>
            </span>
          ))}
        </div>
      </Box>
    </div>
  )
}

export default TranslationViewCellSkeleton
