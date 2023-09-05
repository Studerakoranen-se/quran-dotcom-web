import * as React from 'react'
import {
  Alert,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from '@mui/material'
import { Formit, Form as FormitForm, Field as FormitField } from '@noaignite/formit'
import { useI18n, useRemoteConfig } from '~/contexts'
import { FormitButton, FormitTextField } from '~/containers'
// import { gtmEvent } from '~/utils'

const BREAKPOINT_KEY = 'md'

const FormRoot = styled('section')({
  padding: 'var(--cia-section-spacing) var(--cia-container-spacing)',
})

const FormGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridGap: theme.spacing(2, 'var(--cia-container-spacing)'),
  padding: 'calc(var(--cia-section-spacing) * 2) calc(var(--cia-container-spacing) * 2)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}))

const FormHeading = styled('h1')(({ theme }) => ({
  ...theme.typography.h5,
  margin: 0,
  fontSize: `max(${theme.typography.h5.fontSize}, 2.03vw)`,
}))

const FormFormitForm = styled(FormitForm)(({ theme }) => ({
  display: 'grid',
  gridGap: theme.spacing(4),
}))

const FormFields = styled('div')(({ theme }) => ({
  display: 'grid',
  gridGap: theme.spacing(3),
}))

const CheckboxContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}))

const LastFields = styled('div')(() => ({
  opacity: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  height: 0,
  width: 0,
  zIndex: -1,
}))

type OptionType = {
  label: string
  value: string
}

type InputType = {
  label?: string
  name: string
  pattern?: string
  required?: boolean
  value?: string
}

type CheckboxType = {
  checked?: boolean
  label: string
  name: string
  required?: boolean
}

type RadioType = {
  label?: string
  name: string
  options: OptionType[]
  required?: boolean
  value?: string
}

type SelectType = {
  label?: string
  name: string
  options: OptionType[]
  required?: boolean
  value?: string
}

type FieldType = InputType | CheckboxType | RadioType | SelectType

type FormProps = {
  id: string
  renderIndex: string
  heading: string
  endpoint: string
  errorMessage: string
  fetchOptions: any
  fields: FieldType[]
  showPrivacyPolicyDisclaimer: boolean
  submitLabel: string
  successMessage: string
}

function Form(props: FormProps) {
  const {
    endpoint: endpointProp,
    errorMessage,
    fetchOptions: fetchOptionsProp,
    fields,
    heading,
    id,
    renderIndex,
    showPrivacyPolicyDisclaimer,
    submitLabel,
    successMessage,
  } = props

  const { t } = useI18n()
  // @ts-ignore
  const { privacyPolicyPageUrl } = useRemoteConfig()

  const [status, setStatus] = React.useState('')

  const handleSubmit = React.useCallback(
    async (values, { setSubmitting }) => {
      setSubmitting(true)

      /* [Start] If one of the fake fields are filled then the form will not be submitted */
      // @ts-ignore
      if (document.getElementById(`name-${renderIndex}`)?.value) {
        setStatus('success')
        return
      }
      /* [End] If one of the fake fields are filled then the form will not be submitted */

      const urlSearchParams = new URLSearchParams({
        id,
        ...values,
      })

      const method = fetchOptionsProp?.method || 'POST'
      const endpoint =
        method === 'GET'
          ? new URL(`${endpointProp}?${urlSearchParams.toString()}`)
          : new URL(endpointProp)

      const fetchOptions = {
        body: method === 'POST' ? urlSearchParams : undefined,
        method,
        ...fetchOptionsProp,
      }

      try {
        const response = await fetch(endpoint, fetchOptions)

        if (response.ok) {
          //   gtmEvent({
          //     event: 'form_submit',
          //     parameter1: id,
          //     parameter2: heading,
          //   })
        }

        setStatus(response.ok ? 'success' : 'error')
      } catch (err) {
        console.error(err)
        setStatus('error')
      }

      setSubmitting(false)
    },
    [endpointProp, fetchOptionsProp, id, renderIndex],
  )

  // Compose Formit initialValues
  const initialValues = fields.reduce((acc, field) => {
    // @ts-ignore
    const { checked, name, type, value = '' } = field

    acc[name] = type === 'checkbox' ? !!checked : value

    return acc
  }, {})

  return (
    <Formit initialValues={initialValues} onSubmit={handleSubmit}>
      <FormRoot id={id}>
        <FormGrid>
          <header>{heading && <FormHeading>{heading}</FormHeading>}</header>

          <FormFormitForm>
            {/* {text && <SanityHtml blocks={text} />} */}

            {status === 'error' && (
              <Alert severity="error">
                {errorMessage || t(__translationGroup)`Oops, something went wrong!`}
              </Alert>
            )}

            {status === 'success' ? (
              <Alert severity="success">{successMessage || t(__translationGroup)`Success`}</Alert>
            ) : (
              <React.Fragment>
                <FormFields>
                  {fields?.map((field, idx) => {
                    // @ts-ignore
                    const { label, name, options, pattern, required, type } = field

                    const sharedProps = {
                      key: idx,
                      id: `form-field-${renderIndex}-${idx}`, // Makes `label` and `helperText` accessible for screen readers.
                      name,
                    }

                    if (type === 'checkbox') {
                      return (
                        <CheckboxContainer>
                          <FormitField
                            sx={{ my: -1, mr: !label ? 0 : 2 }}
                            component={FormControlLabel}
                            control={<Checkbox required={required} />}
                            label={label}
                            {...sharedProps}
                          />
                          {/* {!label && <SanityHtml blocks={labelHtml} />} */}
                        </CheckboxContainer>
                      )
                    }

                    if (type === 'radio') {
                      return (
                        <div key={idx}>
                          <Typography sx={{ mb: 1 }}>{label}</Typography>

                          <FormitField component={RadioGroup} {...sharedProps}>
                            {options?.map((option, idx2) => (
                              <FormControlLabel
                                key={idx2}
                                control={<Radio required={required} />}
                                label={option.label}
                                value={option.value}
                              />
                            ))}
                          </FormitField>
                        </div>
                      )
                    }

                    if (type === 'select') {
                      options.sort((a, b) => {
                        return a.label?.localeCompare(b.label)
                      })
                      return (
                        // @ts-ignore
                        <FormitTextField
                          label={label}
                          required={required}
                          fullWidth
                          select
                          {...sharedProps}
                        >
                          {options?.map((option, idx2) => (
                            <MenuItem key={idx2} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </FormitTextField>
                      )
                    }

                    return (
                      <FormitTextField
                        // @ts-ignore
                        inputProps={{ pattern }}
                        label={label}
                        required={required}
                        fullWidth
                        {...(type === 'textarea'
                          ? {
                              multiline: true,
                              minRows: 5,
                            }
                          : { type })}
                        {...sharedProps}
                      />
                    )
                  })}
                  {/* [Start] Fake fields so bots fills them and the form will not be submitted */}
                  <LastFields>
                    <label htmlFor="name" />
                    <input
                      autoComplete="new-password"
                      type="text"
                      id={`name-${renderIndex}`}
                      name="name"
                      placeholder="Your name here"
                      tabIndex={-1}
                    />
                  </LastFields>
                  {/* [End] Fake fields so bots fills them and the form will not be submitted */}
                </FormFields>
                {/* @ts-ignore */}
                <FormitButton variant="contained" type="submit" fullWidth>
                  {submitLabel || t(__translationGroup)`Send`}
                </FormitButton>
                {showPrivacyPolicyDisclaimer && (
                  <Typography>
                    {t(
                      __translationGroup,
                    )`By submitting this form, you confirm that you have read and understood our `}
                    <a href={privacyPolicyPageUrl}>{t(__translationGroup)`privacy policy`}</a>
                  </Typography>
                )}
              </React.Fragment>
            )}
          </FormFormitForm>
        </FormGrid>
      </FormRoot>
    </Formit>
  )
}

export default Form
