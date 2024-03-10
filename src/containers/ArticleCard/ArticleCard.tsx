import * as React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography, styled } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'
import { useI18n } from '~/contexts'
import { ASPECT_RATIOS } from '~/utils/constants'
import RouterLink from '../RouterLink'

const ArticleCardRoot = styled('article')({
  position: 'relative',
})

const ArticleCardContent = styled('div')(({ theme }) => ({
  ...theme.mixins.verticalRhythm(1),
  padding: `calc(var(--cia-section-spacing) / 2) var(--cia-container-spacing) max(var(--cia-container-spacing), ${theme.spacing(6)})`, // prettier-ignore
}))

const ArticleSubheading = styled(Typography)(({ theme }) => ({
  ...theme.mixins.lineClamp(2),
}))

type ArticleCardProps = {
  title?: string
  excerpt?: string
  mediaProps?: any
  date?: string
  ctaUrl?: string
  ctaLabel?: string
}

function ArticleCard(props: ArticleCardProps) {
  const { date, title, excerpt, ctaUrl, ctaLabel, mediaProps, ...other } = props

  const { t } = useI18n()

  return (
    <ArticleCardRoot {...other}>
      {mediaProps && (
        <MediaReveal {...ASPECT_RATIOS.article}>
          <Media alt="" {...mediaProps} {...ASPECT_RATIOS.article} />
        </MediaReveal>
      )}

      <ArticleCardContent>
        <Typography component="p" variant="h5">
          {title}
        </Typography>

        {excerpt && <ArticleSubheading as="p">{excerpt}</ArticleSubheading>}

        {date && (
          <Typography color="text.secondary" component="p" variant="caption" sx={{ mb: 1 }}>
            {date}
          </Typography>
        )}

        <Button
          component={RouterLink}
          href={ctaUrl}
          // @ts-ignore
          color="text"
          size="medium"
          variant="contained"
          aria-label={t('aria').translate(`read-more`, { value: title })}
        >
          {ctaLabel || t('aria').translate(`read-more-about`)}
        </Button>
      </ArticleCardContent>
    </ArticleCardRoot>
  )
}

// TODO: Use `articleType`?
ArticleCard.propTypes = {
  date: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  ctaText: PropTypes.string,
  mediaProps: PropTypes.object,
  url: PropTypes.string,
}

export default ArticleCard
