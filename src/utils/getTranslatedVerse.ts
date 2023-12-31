export const getTranslatedVerse = async (
  chapterId: string,
): Promise<{ [key: string]: { href: string; scrapedData: any[] } }> => {
  return new Promise((res) => {
    import('./swedishTranslations.json').then((data) => {
      res(data.default[chapterId])
    })
  })
}

export default getTranslatedVerse
