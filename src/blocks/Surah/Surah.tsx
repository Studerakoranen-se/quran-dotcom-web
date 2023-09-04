import { styled } from '@mui/material'

const SurahRoot = styled('section')(({ theme }) => ({
  position: 'relative',
}))

const SurahRootMain = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
  marginBlockStart: theme.spacing(3),
  marginBlockEnd: theme.spacing(3),
}))

type SurahProps = {}

function Surah(props: SurahProps) {
  console.log({ props })
  return (
    <SurahRoot>
      <SurahRootMain>SurahRootMain</SurahRootMain>
    </SurahRoot>
  )
}

export default Surah
