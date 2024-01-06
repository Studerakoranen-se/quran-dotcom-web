import React from 'react'
import { Box } from '@mui/material'
import { shallowEqual, useSelector } from 'react-redux'
import { selectWordByWordFontScale } from '~/store/slices/QuranReader/styles'
// import styles from './InlineWordByWord.module.scss';

// const FONT_SIZE_CLASS_MAP = {
//   1: styles.xs,
//   2: styles.sm,
//   3: styles.md,
//   4: styles.lg,
//   5: styles.xl,
//   6: styles.xxl,
// };

type Props = {
  text?: string
  className?: string
}

const InlineWordByWord: React.FC<Props> = ({ text, className }) => {
  const wordByWordFontScale = useSelector(selectWordByWordFontScale, shallowEqual)
  return (
    <Box
      component="p"
      sx={{
        whiteSpace: 'normal',
        overflowWrap: 'break-word',
        // center the text content inside the container
        margin: 'auto',
      }}
      // className={classNames(styles.word, className, FONT_SIZE_CLASS_MAP[wordByWordFontScale])}
    >
      {text}
    </Box>
  )
}

export default InlineWordByWord
