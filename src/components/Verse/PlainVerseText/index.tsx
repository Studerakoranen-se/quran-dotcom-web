import { styled } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import useIsFontLoaded from '~/blocks/QuranReader/hooks/useIsFontLoaded'
import { ChapterNumberIcon } from '~/components'
import GlyphWord from '~/components/QuranWord/GlyphWord'
import TajweedWord from '~/components/QuranWord/TajweedWordImage'
import TextWord from '~/components/QuranWord/TextWord'
import { selectQuranReaderStyles } from '~/store/slices/QuranReader/styles'
import { QuranFont } from '~/types/QuranReader'
import Word from '~/types/Word'
import { getFontClassName, isQCFFont } from '~/utils/fontFaceHelper'
import styles from '../VerseText.module.scss'
import PlainVerseTextWord from './PlainVerseTextWord'

const PlainVerseTextWordIconContainer = styled('div')(() => ({
  position: 'relative',
  width: 45,
  height: 45,
  span: {
    color: 'white',
    textAlign: 'center',
    marginTop: 2,
  },
  svg: {
    width: '100%',
    height: '100%',
  },
}))

const PlainVerseTextWordIconText = styled('span')(({ theme }) => ({
  ...theme.typography.subtitle1,
  ...theme.mixins.absolute(0),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
}))

type Props = {
  words: Word[]
  shouldShowWordByWordTranslation?: boolean
  shouldShowWordByWordTransliteration?: boolean
  fontScale?: number
  quranFont?: QuranFont
}

/**
 * A component to only show the verse text without extra functionalities such as ayah
 * highlighting when audio is playing or showing a tooltip when
 * hovering over a verse or showing the word by word translation/transliteration.
 *
 * @param {Props} param0
 * @returns {JSX.Element}
 */
const PlainVerseText: React.FC<Props> = ({
  words,
  shouldShowWordByWordTranslation = false,
  shouldShowWordByWordTransliteration = false,
  fontScale,
  quranFont: quranFontFromProps,
}: Props): JSX.Element => {
  const {
    quranFont: quranFontFromStore,
    quranTextFontScale,
    mushafLines,
  } = useSelector(selectQuranReaderStyles, shallowEqual)
  const quranFont = quranFontFromProps || quranFontFromStore
  const isQcfFont = isQCFFont(quranFont)
  const { pageNumber } = words[0]
  const isFontLoaded = useIsFontLoaded(pageNumber as number, quranFont)

  return (
    <React.Fragment>
      {/* <SeoTextForVerse words={words} /> */}
      {/* <TajweedFontPalettes pageNumber={pageNumber as number} quranFont={quranFont} /> */}
      <div
        className={classNames(
          styles.verseTextContainer,
          styles.tafsirOrTranslationMode,
          styles[getFontClassName(quranFont, fontScale || quranTextFontScale, mushafLines)],
        )}
      >
        <div className={classNames(styles.verseText, styles.verseTextWrap)} translate="no">
          {words?.map((word) => {
            // Handle end character type (chapter number icon)
            if (word.charTypeName === 'end') {
              let wordText: React.ReactNode = null

              if (isQcfFont) {
                wordText = (
                  <GlyphWord
                    font={quranFont}
                    qpcUthmaniHafs={word.textUthmani as string}
                    pageNumber={word.pageNumber as number}
                    textCodeV1={word.codeV1}
                    textCodeV2={word.codeV2}
                    isFontLoaded={isFontLoaded}
                  />
                )
              } else if (quranFont === QuranFont.Tajweed) {
                wordText = <TajweedWord path={word.text} alt={word.textUthmani} />
              } else {
                wordText = (
                  <TextWord font={quranFont} text={word.text} charType={word.charTypeName} />
                )
              }

              return (
                <PlainVerseTextWordIconContainer key={word.location}>
                  <PlainVerseTextWordIconText>{wordText}</PlainVerseTextWordIconText>
                  <ChapterNumberIcon />
                </PlainVerseTextWordIconContainer>
              )
            }

            if (isQcfFont) {
              return (
                <PlainVerseTextWord
                  font={quranFont}
                  key={word.location}
                  word={word}
                  shouldShowWordByWordTranslation={shouldShowWordByWordTranslation}
                  shouldShowWordByWordTransliteration={shouldShowWordByWordTransliteration}
                >
                  <GlyphWord
                    font={quranFont}
                    qpcUthmaniHafs={word.textUthmani as string}
                    pageNumber={word.pageNumber as number}
                    textCodeV1={word.codeV1}
                    textCodeV2={word.codeV2}
                    isFontLoaded={isFontLoaded}
                  />
                </PlainVerseTextWord>
              )
            }
            if (quranFont === QuranFont.Tajweed) {
              return (
                <PlainVerseTextWord
                  font={quranFont}
                  key={word.location}
                  word={word}
                  shouldShowWordByWordTranslation={shouldShowWordByWordTranslation}
                  shouldShowWordByWordTransliteration={shouldShowWordByWordTransliteration}
                >
                  <TajweedWord path={word.text} alt={word.textUthmani} />
                </PlainVerseTextWord>
              )
            }
            return (
              <PlainVerseTextWord
                font={quranFont}
                key={word.location}
                word={word}
                shouldShowWordByWordTranslation={shouldShowWordByWordTranslation}
                shouldShowWordByWordTransliteration={shouldShowWordByWordTransliteration}
              >
                <TextWord font={quranFont} text={word.text} charType={word.charTypeName} />
              </PlainVerseTextWord>
            )
          })}
        </div>
      </div>
    </React.Fragment>
  )
}

export default PlainVerseText
