import * as React from 'react'
import { Tab as MuiTab, Tabs as MuiTabs } from '@mui/material'
import { useI18n } from '~/contexts'

type Tab = {
  title: string
  value: number
}
type TabsProps = {
  tabs: Tab[]
  selected: number
  onSelect?: (value: number) => void
}

const Tabs = ({ tabs, onSelect, selected }: TabsProps) => {
  const { t } = useI18n()
  return (
    <MuiTabs
      value={selected}
      // @ts-ignore
      onChange={onSelect}
      aria-label={t('aria').translate(`tabs`)}
      sx={{
        ' .MuiTabs-indicator': {
          backgroundColor: 'text.main',
          height: '3px',
        },
      }}
    >
      {tabs?.map((tab, idx) => (
        <MuiTab
          key={tab.value}
          label={tab.title}
          id={`quran-tab-${idx}`}
          value={tab.value}
          sx={{
            color: (theme) => `${theme.vars.palette.text.primary} !important`,
            mr: 1,
          }}
        />
      ))}
    </MuiTabs>
  )
}

export default Tabs
