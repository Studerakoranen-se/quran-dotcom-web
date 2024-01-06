import classNames from 'classnames'
import range from 'lodash/range'
import { useSelector, shallowEqual } from 'react-redux'
import { Box, Button } from '@mui/material'
import Skeleton from '~/components/Skeleton'
import useGetQueryParamOrReduxValue from '~/hooks/useGetQueryParamOrReduxValue'
import { selectQuranReaderStyles } from '~/store/slices/QuranReader/styles'
import QueryParam from '~/types/QueryParam'
import { QuranFont } from '~/types/QuranReader'

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
    <Box
      sx={{
        borderBlockEnd: '1px solid rgb(235, 238, 240)',

        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        direction: 'ltr',

        padding: '0.8125rem',
        '--gap-size': 'calc(0.5 * 2rem)',

        // --gap-size: calc(1.5 * 2rem);
        //   flex-direction: row;
        //   padding: 0;
      }}
    >
      <div
      // className={cellStyles.actionContainer}
      >
        <div
        // className={cellStyles.actionContainerLeft}
        >
          {range(0, 4).map((index) => (
            <Skeleton
              key={index}
              style={{
                marginInlineEnd: 'calc(0.5 * 0.375rem)',
                //  @include breakpoints.tablet {
                //    margin-inline-end: 0;
                //    margin-block-end: calc(0.5 * 0.375rem);
                //  }
              }}
            >
              <Button size="small" />
            </Skeleton>
          ))}
        </div>
        {hasActionMenuItems && (
          <div
          // className={cellStyles.actionContainerRight}
          >
            <Skeleton
              style={{
                marginInlineEnd: 'calc(0.5 * 0.375rem)',
                //  @include breakpoints.tablet {
                //    margin-inline-end: 0;
                //    margin-block-end: calc(0.5 * 0.375rem);
                //  }
              }}
            >
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
        // className={classNames(skeletonStyles.verseContainer, cellStyles.arabicVerseContainer, {
        //   [verseTextStyles[getFontClassName(quranFont, quranTextFontScale, mushafLines)]]:
        //     !isTajweedFont,
        // })}
        />
        <div
        // className={classNames(
        //   cellStyles.verseTranslationsContainer,
        //   skeletonStyles[`translation-font-size-${translationFontScale}`],
        // )}
        >
          {selectedTranslations.map((translation) => (
            <span key={translation}>
              <div>
                <Skeleton
                // lassName={classNames(skeletonStyles.translationText)}
                >
                  {TRANSLATION_TEXT_SAMPLE}
                </Skeleton>
              </div>
              <div>
                <Skeleton
                //  className={classNames(skeletonStyles.translationAuthor)}
                >
                  {TRANSLATION_AUTHOR_SAMPLE}
                </Skeleton>
              </div>
            </span>
          ))}
        </div>
      </Box>
    </Box>
  )
}

export default TranslationViewCellSkeleton
