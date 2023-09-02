import * as React from 'react'
import { usePopper } from 'react-popper'

const Dropdown = (props: any, forwardedRef: any) => {
  const [visibility, setVisibility] = React.useState<any>(false)

  const referenceRef = React.useRef<any>()
  const popperRef = React.useRef<any>()

  const { styles, attributes } = usePopper(referenceRef.current, popperRef.current, {
    placement: props.placement || 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: props.offset || [0],
        },
      },
    ],
  })

  const handleDocumentClick = (event: any) => {
    if (referenceRef.current.contains(event.target) || popperRef.current.contains(event.target)) {
      return
    }

    setVisibility(false)
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  React.useImperativeHandle(forwardedRef, () => ({
    close() {
      setVisibility(false)
    },
  }))

  return (
    <React.Fragment>
      <button
        ref={referenceRef}
        type="button"
        className={props.btnClassName}
        onClick={() => setVisibility(!visibility)}
      >
        {props.button}
      </button>

      <div
        ref={popperRef}
        style={styles.popper}
        {...attributes.popper}
        className="z-50"
        onClick={() => setVisibility(!visibility)}
      >
        {visibility && props.children}
      </div>
    </React.Fragment>
  )
}

export default React.forwardRef(Dropdown)
