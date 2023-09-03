import * as React from 'react'
import Link, { LinkProps } from 'next/link'

const RouterLink = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<LinkProps>>(
  function RouterLink(props, ref) {
    const { as, children, href = '', replace, scroll, shallow, ...other } = props

    // Render as a regular `a` tag if href contains a protocol.
    if (/^https?:\/\//.test(href as string)) {
      return (
        <a href={href as string} rel="noopener noreferrer" target="_blank" ref={ref} {...other}>
          {children}
        </a>
      )
    }

    return (
      <Link
        ref={ref}
        as={as}
        href={href}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
        {...other}
      >
        {children}
      </Link>
    )
  },
)

export default RouterLink
