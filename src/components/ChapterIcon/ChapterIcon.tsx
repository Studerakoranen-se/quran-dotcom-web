import * as React from 'react'

interface Props {
  id: string
}

const ChapterIcon: React.FC<Props> = ({ id }) => (
  <span className={`icon-surah icon-surah${id}`} translate="no" />
)

export default ChapterIcon
