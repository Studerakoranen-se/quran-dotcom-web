import * as React from 'react'
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Formit, Form as FormitForm, Field as FormitField } from '@noaignite/formit'
import { useI18n, useRemoteConfig } from '~/contexts'
import { FormitButton, FormitTextField, SanityHtml } from '~/containers'

// import { gtmEvent } from '~/utils'

const FormRoot = styled('section')({
  padding: 'var(--cia-section-spacing) var(--cia-container-spacing)',
})

const FormGrid = styled('div')<{ ownerState: { gridLayout?: boolean } }>(
  ({ theme, ownerState }) => ({
    ...theme.mixins.contain('lg'),
    display: 'grid',
    gridGap: theme.spacing(2, 'var(--cia-container-spacing)'),
    padding: 'calc(var(--cia-section-spacing) * 2) var(--cia-container-spacing)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.vars.palette.background.default,
    color: theme.vars.palette.text.primary,
    boxShadow: '0px 4px 430px rgba(0, 0, 0, 0.1)',

    [theme.breakpoints.up('md')]: {
      ...(ownerState?.gridLayout && {
        gridTemplateColumns: 'repeat(2, 1fr)',
      }),
    },
  }),
)

const FormHeading = styled('h1')(({ theme }) => ({
  ...theme.typography.h4,
  margin: 0,
  fontSize: `max(${theme.typography.h4.fontSize}, 2.2vw)`,
}))

const FormFormitForm = styled(FormitForm)(({ theme }) => ({
  display: 'grid',
  gridGap: theme.spacing(4),
}))

const FormFields = styled('div')<{ ownerState: { gridLayout?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: 'grid',
    gridGap: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      ...(!ownerState?.gridLayout && {
        gridTemplateColumns: 'repeat(3, 1fr)',
      }),
    },
  }),
)

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
  heading?: string
  text?: any
  gridLayout?: boolean
  endpoint: string
  errorMessage: string
  fetchOptions: any
  fields: FieldType[]
  showPrivacyPolicyDisclaimer: boolean
  submitLabel: string
  successMessage: string
  tutors: {
    fullname: string
    gender: string
    age: number
    email: string
    phone: string
  }[]
}

function Form(props: FormProps) {
  const {
    endpoint: endpointProp,
    errorMessage,
    fetchOptions: fetchOptionsProp,
    fields,
    heading,
    text,
    id,
    renderIndex,
    showPrivacyPolicyDisclaimer,
    submitLabel,
    successMessage,
    tutors,
    gridLayout,
  } = props

  const muiTheme = useTheme()

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

      const formValues = {
        id,
        ...values,
      }

      const method = fetchOptionsProp?.method || 'POST'

      try {
        const response = await fetch(endpointProp, {
          method,
          credentials: 'include',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(formValues),
        }).then((res) => {
          if (!res.ok) throw new Error('Failed to send')
          return res.json()
        })

        setStatus(response.success ? 'success' : 'error')
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
        <FormGrid
          ownerState={{
            gridLayout,
          }}
        >
          <header>{heading && <FormHeading>{heading}</FormHeading>}</header>

          <FormFormitForm>
            {text && <SanityHtml blocks={text} />}

            {status === 'error' && (
              <Alert severity="error">
                {errorMessage || t(__translationGroup)`Oops, something went wrong!`}
              </Alert>
            )}

            {status === 'success' ? (
              <Alert severity="success" sx={{ alignItems: 'center' }}>
                {successMessage || t(__translationGroup)`Success`}
              </Alert>
            ) : (
              <React.Fragment>
                <FormFields
                  ownerState={{
                    gridLayout,
                  }}
                >
                  {fields?.map((field, idx) => {
                    // @ts-ignore
                    const { label, name, options, pattern, required, type, helperText, rows } =
                      field

                    const sharedProps = {
                      key: idx,
                      id: `form-field-${renderIndex}-${idx}`, // Makes `label` and `helperText` accessible for screen readers.
                      name,
                      helperText,
                    }

                    if (type === 'checkbox') {
                      return (
                        <CheckboxContainer sx={{ gridColumn: '1/-1' }}>
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
                        <Box key={idx}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {label}
                          </Typography>

                          <FormitField component={RadioGroup} {...sharedProps}>
                            {options?.map((option, idx2) => (
                              <FormControlLabel
                                key={idx2}
                                control={<Radio required={required} />}
                                label={option.label}
                                value={option.value}
                                sx={(theme) => ({
                                  '.MuiFormControlLabel-label': {
                                    ...theme.typography.caption,
                                  },
                                })}
                              />
                            ))}
                          </FormitField>
                        </Box>
                      )
                    }

                    if (type === 'select') {
                      if (name === 'teacher') {
                        return (
                          // @ts-ignore
                          <FormitTextField
                            label={label}
                            required={required}
                            fullWidth
                            select
                            {...sharedProps}
                          >
                            {tutors?.map((tutor, idx2) => (
                              // @ts-ignore
                              <MenuItem key={idx2} value={tutor}>
                                {tutor.fullname}
                              </MenuItem>
                            ))}
                          </FormitTextField>
                        )
                      }

                      options?.sort((a, b) => {
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
                        {...(type === 'textArea'
                          ? {
                              multiline: true,
                              minRows: rows || 5,
                            }
                          : { type })}
                        {...sharedProps}
                        sx={{
                          '.MuiFormHelperText-root': {
                            color: 'text.main',
                            mx: 0,
                            mt: 1,
                            mb: 2,
                          },
                        }}
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
                <FormitButton
                  variant="contained"
                  type="submit"
                  sx={{ width: !gridLayout ? 200 : undefined }}
                  {...(gridLayout && { fullWidth: true })}
                >
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
