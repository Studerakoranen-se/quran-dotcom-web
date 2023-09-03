import * as React from 'react'

interface Variants {
  [key: string]: React.ElementType
}

export default function createRenderBlock(variants: Variants) {
  function renderBlock({ name, props = {} }: Block, idx: number) {
    const { children: childrenProp, ...other } = props

    if (!name) {
      console.error(`CIA: 🕵️‍♂️ Block with index ${idx} does not have a name`)
      return null
    }

    const Component = variants[name]
    const children = childrenProp ? childrenProp.map(renderBlock) : undefined

    if (!Component) {
      console.error(`CIA: 🕵️‍♂️ Block not found: %c${name}`, 'font-weight: bold')

      return null
    }

    return (
      <Component key={idx} renderIndex={idx} {...other}>
        {children}
      </Component>
    )
  }

  return renderBlock
}
