/**
 * Get the href link to a surah.
 *
 * @param {string | number} surahIdOrSlug
 * @returns  {string}
 */
const getSurahNavigationUrl = (surahIdOrSlug: string | number): string => `/${surahIdOrSlug}`

export default getSurahNavigationUrl
