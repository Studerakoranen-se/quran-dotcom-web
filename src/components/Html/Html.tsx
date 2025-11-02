import { SxProps } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import * as React from 'react'

export const HtmlRoot = styled('div')(({ theme }) => ({
  ...theme.typography.body1,
  h1: theme.typography.h1,
  h2: {
    ...theme.typography.h4,
    margin: 0,
    fontSize: `max(${theme.typography.h4.fontSize}, 2.2vw)`,
  },
  h3: theme.typography.h3,
  h4: theme.typography.h4,
  h5: theme.typography.h5,
  h6: theme.typography.h6,
  '& :is(h1, h2, h3, h4, h5, h6, figcaption, p, ol, ul, hr)': {
    margin: 'max(16px, 1em) auto max(8px, 0.5em)',
  },
  '& :is(blockquote, figure, img)': {
    margin: '2.8em auto',
  },
  '& *:not(style):first-of-type': {
    marginTop: 0,
  },
  '& *:not(style):last-child': {
    marginBottom: 0,
  },
  blockquote: {
    '& p': theme.typography.h4,
    '& cite': theme.typography.caption,
  },
  'figure img': {
    margin: 0,
  },
  img: {
    display: 'block',
    width: '100%',
  },
  figcaption: theme.typography.caption,
  '& :is(ol, ul)': {
    paddingLeft: '1.25em',
    '& li': {
      marginBottom: theme.spacing(1.2),
    },
  },
  hr: {
    height: 1,
    border: 'none',
    backgroundColor: 'currentColor',
  },
  a: {
    '& *:not(style):button': {
      color: 'inherit',
    },
  },
  sup: {
    ...theme.typography.caption,
    fontWeight: theme.typography.fontWeightBold,
    color: '#5ea9a9',
    cursor: 'pointer',
    [theme.getColorSchemeSelector('dark')]: {
      color: '#E0D2B4',
    },
  },
}))

interface HtmlProps {
  children?: React.ReactNode
  component?: any
  className?: string
  lang?: string

  dir?: string
  sx?: SxProps<Theme>
  dangerouslySetInnerHTML?: {
    __html: string
  }
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Html = React.forwardRef(function Html(props: HtmlProps, ref: any) {
  const { children, component: Component = HtmlRoot, ...other } = props

  return (
    <Component ref={ref} {...other}>
      {children}
    </Component>
  )
})

export default Html
