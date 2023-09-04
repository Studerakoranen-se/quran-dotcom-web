import * as React from 'react'
import { useFormitContext } from '@noaignite/formit'
import { LoadingButton } from '@mui/lab'
import { Button } from '@mui/material'

type FormitButtonProps = {
  type?: string
  loading?: boolean
  disabled?: boolean
}
const FormitButton = React.forwardRef(function FormitButton(props: FormitButtonProps, ref) {
  const { type, ...other } = props
  const { isSubmitting } = useFormitContext()

  let Component = Button
  const componentsProps = { type, ...other }

  if (type === 'submit') {
    Component = LoadingButton
    componentsProps.loading = isSubmitting
  } else {
    componentsProps.disabled = isSubmitting
  }

  // @ts-ignore
  return <Component ref={ref} {...componentsProps} />
})

export default FormitButton
