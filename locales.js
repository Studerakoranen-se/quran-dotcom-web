const languages = [
  { id: 'ar', title: 'Arabic', path: '/ar/' },
  { id: 'sv', title: 'Swedish', isDefault: true, path: '/' },
]

const i18n = {
  languages,
  base: languages.find((item) => item.isDefault).id,
}

const googleTranslateLanguages = languages.map(({ id, title }) => ({ id, title }))

module.exports = { i18n, googleTranslateLanguages }
