import React, { MouseEvent } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import { useI18n } from '~/contexts'
import { CloseIcon } from '~/components'
// import { getLanguageDataById, findLanguageIdByLocale } from '~/utils/locale';
import Footnote from '~/types/Footnote'
//  import transStyles from './TranslationText.module.scss';

interface FootnoteTextProps {
  footnoteName?: string // can be a number or a string (e.g. "sg" or "pl")
  footnote: Footnote
  onCloseClicked: () => void
  onTextClicked?: (event: MouseEvent, isSubFootnote?: boolean) => void
  isLoading?: boolean
}

const FootnoteText: React.FC<FootnoteTextProps> = ({
  footnoteName,
  footnote,
  onCloseClicked,
  onTextClicked,
  isLoading,
}) => {
  const { t } = useI18n()

  // const languageId = footnote?.languageId || findLanguageIdByLocale(lang);
  // const landData = getLanguageDataById(languageId);

  return (
    <Box
      sx={{
        backgroundColor: 'divider',
      }}
      // className={styles.footnoteContainer}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        sx={{
          mt: 2,
          pl: 2,
        }}
      >
        <p>
          {t('footnote')`title`} {footnoteName ? `- ${footnoteName}` : null}
        </p>
        <Button size="small" onClick={onCloseClicked}>
          <CloseIcon />
        </Button>
      </Box>
      {isLoading ? (
        <CircularProgress size="small" />
      ) : (
        <Box
          sx={{
            p: 2,
            '& p': {
              m: 0,
            },
          }}
          // className={classNames(
          //   styles.text,
          //   transStyles[landData.direction],
          //   transStyles[landData.font],
          // )}
          dangerouslySetInnerHTML={{ __html: footnote.text }}
          {...(onTextClicked && { onClick: onTextClicked })}
        />
      )}
    </Box>
  )
}

export default FootnoteText
