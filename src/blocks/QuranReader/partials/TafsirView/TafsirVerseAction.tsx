import { IconButton } from '@mui/material'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import BookOpenIcon from '~/components/icons/BookOpenIcon'
import { useI18n } from '~/contexts'
import { selectSelectedTafsirs } from '~/store/slices/QuranReader/tafsirs'
import { logButtonClick, logEvent } from '~/utils/eventLogger'
import { fakeNavigate } from '~/utils/navigation'
import QuranReaderAyahTafsir from '../QuranReaderAyahTafsir'

const TafsirBody = dynamic(() => import('./TafsirBody'), { ssr: false })

type TafsirVerseActionProps = {
  verseNumber: number
  chapterId: number
  isTranslationView?: boolean
  onActionTriggered?: () => void
  locale: string
}

const CLOSE_POPOVER_AFTER_MS = 150

const TafsirVerseAction = ({
  chapterId,
  verseNumber,
  isTranslationView,
  onActionTriggered,
  locale,
}: TafsirVerseActionProps) => {
  const [isContentModalOpen, setIsContentModalOpen] = useState(false)
  const { t } = useI18n()
  const tafsirs = useSelector(selectSelectedTafsirs)
  const router = useRouter()

  const onModalClose = () => {
    if (isTranslationView) {
      logEvent('translation_view_tafsir_modal_close')
    } else {
      logEvent('reading_view_tafsir_modal_close')
    }
    setIsContentModalOpen(false)
    fakeNavigate(router.asPath, locale)
    if (onActionTriggered) {
      setTimeout(() => {
        // we set a really short timeout to close the popover after the modal has been closed to allow enough time for the fadeout css effect to apply.
        onActionTriggered()
      }, CLOSE_POPOVER_AFTER_MS)
    }
  }

  return (
    <React.Fragment>
      <IconButton
        onClick={() => {
          setIsContentModalOpen(true)
          logButtonClick(
            `${isTranslationView ? 'translation_view' : 'reading_view'}_verse_actions_menu_tafsir`,
          )
        }}
      >
        <BookOpenIcon />
      </IconButton>
      <TafsirBody
        shouldRender={isContentModalOpen}
        initialChapterId={chapterId.toString()}
        initialVerseNumber={verseNumber.toString()}
        // scrollToTop={() => {
        //   contentModalRef.current.scrollToTop()
        // }}
        locale={locale}
        render={({ body, languageAndTafsirSelection, surahAndAyahSelection }) => {
          return (
            <QuranReaderAyahTafsir
              isContentModalOpen={isContentModalOpen}
              onModalClose={onModalClose}
              languageAndTafsirSelection={languageAndTafsirSelection}
              body={body}
              surahAndAyahSelection={surahAndAyahSelection}
            />
            // <ContentModal
            //   innerRef={contentModalRef}
            //   isOpen={isContentModalOpen}
            //   hasCloseButton
            //   onClose={onModalClose}
            //   onEscapeKeyDown={onModalClose}
            //   header={surahAndAyahSelection}
            // >
            //   {languageAndTafsirSelection}
            //   {body}
            // </ContentModal>
          )
        }}
      />
    </React.Fragment>
  )
}

export default TafsirVerseAction
