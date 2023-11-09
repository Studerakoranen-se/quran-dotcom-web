export interface FormBlockQueryResult {
  id?: string
  endpoint?: string
  heading?: string
  submitLabel?: string
  successMessage?: string
  errorMessage?: string
  showPrivacyPolicyDisclaimer?: boolean
  fetchOptions?: {
    method?: 'GET' | 'POST'
  }
  fields?: Array<
    | {
        _type: 'input'
        name?: string
        label?: string
        required?: boolean
        value?: string
        pattern?: string
      }
    | {
        _type: 'textArea'
        name?: string
        label?: string
        required?: boolean
        value?: string
        rows?: number
      }
    | {
        _type: 'checkbox'
        name?: string
        label?: string
        required?: boolean
        checked?: boolean
        labelHtml?: any
      }
    | {
        _type: 'radio'
        name?: string
        label?: string
        required?: boolean
        value?: string
        options?: Array<{
          _type: 'option'
          label?: string
          value?: string
        }>
      }
    | {
        _type: 'select'
        name?: string
        label?: string
        required?: boolean
        value?: string
        options?: Array<{
          _type: 'option'
          label?: string
          value?: string
        }>
      }
  >
}

export default `
  endpoint,
  heading,
  submitLabel,
  successMessage,
  errorMessage,
  showPrivacyPolicyDisclaimer,
  fetchOptions,
  "tutors": *[_type == 'tutor'],
  fields[] {
    'type': _type,
    name,
    labelHtml,
    defined(label) => {label},
    defined(required) => {required},
    defined(value) => {value},
    defined(pattern) => {pattern},
    defined(rows) => {rows},
    defined(checked) => {checked},
    defined(options) => {options[] {
      label,
      value
    }}
  }
`
