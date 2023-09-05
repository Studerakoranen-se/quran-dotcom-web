const genderOptions = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
]

const selectOptions = [
  {
    label: 'Nybörjare',
    value: 'beginner',
  },
  {
    label: 'Medel',
    value: 'average',
  },
  {
    label: 'Avancerad',
    value: 'avancerad',
  },
]

export default [
  {
    label: 'Förnamn',
    name: 'firstName',
    type: 'text',
    required: true,
  },
  {
    label: 'Efternamn',
    name: 'lastName',
    type: 'text',
    required: true,
  },
  {
    label: 'Mejladress',
    name: 'email',
    type: 'email',
    required: true,
  },
  {
    label: 'Mobilnummer',
    name: 'phone',
    type: 'text',
    required: true,
  },
  {
    label: 'Vad är din studienivå?',
    name: 'studyLevel',
    type: 'select',
    required: true,
    options: selectOptions,
  },
  {
    label: 'Välj instruktör?',
    name: 'tutor',
    type: 'select',
    selectOptions,
  },
  {
    label: 'Ålder?',
    name: 'age',
    type: 'date',
    required: true,
  },
  {
    label: 'Kön',
    name: 'gender',
    type: 'radio',
    required: true,
    options: genderOptions,
  },
  {
    label: 'Vad vill du studera?',
    name: 'topic',
    type: 'textarea',
    required: true,
    helperText:
      'Här skriver du om du har specifika önskemål om att studera en viss bok eller lära dig en viss kunskap.',
  },
  {
    label: 'Vad har du för mål eller förväntningar?',
    name: 'goals',
    type: 'textarea',
    required: true,
    helperText:
      'Här beskriver du vad du vill uppnå med dessa lektioner, så att läraren kan anpassa dina behov',
  },
  {
    label: 'Övriga önskemål',
    name: 'others',
    type: 'textarea',
    required: true,
  },
  // {
  //   label: 'I consent',
  //   name: 'consent',
  //   type: 'checkbox',
  //   required: true,
  // },
]
