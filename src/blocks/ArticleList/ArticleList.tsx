import * as React from 'react'
import { styled } from '@mui/material'
import { ArticleListBlockQueryResult } from '~/api'
import { transformSanityMedia } from '~/api/sanity/utils'
import { ArticleCard } from '~/containers'

const BREAKPOINT_KEY_1 = 'sm'
const BREAKPOINT_KEY_2 = 'lg'

const ArticleListHeader = styled('header')({
  padding: 'calc(var(--cia-section-spacing) * 2) var(--cia-container-spacing) var(--cia-section-spacing)', // prettier-ignore
})

const ArticleListHeading = styled('h1')(({ theme }) => ({
  ...theme.typography.h4,
  margin: theme.spacing(0, 0, 3),
  fontSize: `max(${theme.typography.h4.fontSize}, 2.7vw)`,
}))

const ArticleListSubheading = styled('h2')(({ theme }) => ({
  ...theme.typography.preamble2,
  margin: 0,
  [theme.breakpoints.up(BREAKPOINT_KEY_1)]: {
    // @ts-ignore
    ...theme.typography.preamble1,
  },
}))

const ArticleListGridWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.divider,
}))

const ArticleListGrid = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  [theme.breakpoints.up(BREAKPOINT_KEY_1)]: {
    display: 'grid',
    gridGap: 1,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up(BREAKPOINT_KEY_2)]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}))

const ArticleListGridItem = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}))

function ArticleList(props: ArticleListBlockQueryResult) {
  const { articles, heading, id, body } = props

  const sortedArticles = articles?.sort((a, b) => {
    // @ts-ignore
    return new Date(b.date) - new Date(a.date)
  })

  return (
    <section id={id}>
      <ArticleListHeader>
        <ArticleListHeading>{heading}</ArticleListHeading>

        {body && <ArticleListSubheading>{body}</ArticleListSubheading>}
      </ArticleListHeader>

      <ArticleListGridWrapper>
        <ArticleListGrid>
          {sortedArticles?.map((article, idx) => {
            const { date, mediaProps: sanityMediaProps, title, excerpt, ctaLabel, ctaUrl } = article

            const mediaProps = transformSanityMedia(sanityMediaProps, {
              picture: {
                xs: {
                  width: 16 * 25,
                  height: 9 * 25,
                  dpr: 2,
                },
                md: {
                  width: 16 * 50,
                  height: 9 * 50,
                },
              },
            })

            return (
              <ArticleListGridItem key={idx}>
                <ArticleCard
                  date={date}
                  title={title}
                  mediaProps={mediaProps}
                  excerpt={excerpt}
                  ctaLabel={ctaLabel}
                  ctaUrl={ctaUrl}
                />
              </ArticleListGridItem>
            )
          })}

          {/* KEEP: Fills the grid with empty cells */}
          <ArticleListGridItem aria-hidden />
          <ArticleListGridItem aria-hidden />
        </ArticleListGrid>
      </ArticleListGridWrapper>
    </section>
  )
}

export default ArticleList
