import React from 'react'
import { Button, IconButton } from '@mui/material'
import { logButtonClick } from '~/utils/eventLogger'
import { toLocalizedVerseKey } from '~/utils/locale'
import { getChapterWithStartingVerseUrl } from '~/utils/navigation'
import { RouterLink } from '~/containers'
// import styles from './VerseLink.module.scss';

interface Props {
  verseKey: string
  locale: string
}

const VerseLink: React.FC<Props> = ({ locale, verseKey }) => {
  return (
    <IconButton
      // className={styles.verseLink}
      component={RouterLink}
      size="small"
      href={getChapterWithStartingVerseUrl(verseKey)}
      shallow
      shouldPrefetch={false}
      onClick={() => {
        logButtonClick('translation_view_verse_link')
      }}
    >
      {toLocalizedVerseKey(verseKey, locale)}
    </IconButton>
  )
}

export default VerseLink
