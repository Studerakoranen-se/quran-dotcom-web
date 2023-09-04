const options = [
  {
    label: 'I like red',
    value: 'blue',
  },
  {
    label: 'I like green',
    value: 'green',
  },
  {
    label: 'I like blue',
    value: 'blue',
  },
]

export default [
  {
    label: 'Full name',
    name: 'fullName',
    type: 'text',
    required: true,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
  },
  {
    label: 'Message',
    name: 'message',
    type: 'textarea',
    required: true,
  },
  {
    label: 'I consent',
    name: 'consent',
    type: 'checkbox',
    required: true,
  },
  {
    label: 'Color',
    name: 'color1',
    type: 'radio',
    required: true,
    options,
  },
  {
    label: 'Color',
    name: 'color2',
    type: 'select',
    required: true,
    options,
  },
]
