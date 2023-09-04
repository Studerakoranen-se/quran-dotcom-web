import * as React from 'react'
import { TextField } from '@mui/material'
import { Field } from '@noaignite/formit'

type FormitTextFieldPorps = {
  name: string
}
const FormitTextField = React.forwardRef(function FormitTextField(
  props: FormitTextFieldPorps,
  ref,
) {
  const { name, ...other } = props

  return (
    <Field
      id={`cia-field-${name}`} // Makes `label` and `helperText` accessible for screen readers.
      component={TextField}
      name={name}
      ref={ref}
      {...other}
    />
  )
})

export default FormitTextField
