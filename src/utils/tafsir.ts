import uniq from 'lodash/uniq'
import { TafsirsResponse } from '~/types/ApiResponses'
import Tafsir from '~/types/Tafsir'
import TafsirInfo from '~/types/TafsirInfo'

/**
 * Get the language of the selected Tafsir.
 *
 * @param {TafsirsResponse} tafsirListData
 * @param {number|string} selectedTafsirIdOrSlug
 * @returns {string}
 */
export const getSelectedTafsirLanguage = (
  tafsirListData: TafsirsResponse,
  selectedTafsirIdOrSlug: number | string,
): string => {
  const selectedTafsir = tafsirListData?.tafsirs?.find(
    (tafsir) =>
      tafsir.slug === selectedTafsirIdOrSlug || tafsir.id === Number(selectedTafsirIdOrSlug),
  )
  return selectedTafsir?.languageName || ''
}

/**
 * Get the first Tafsir of a language.
 *
 * @param {TafsirsResponse} tafsirListData
 * @param {string} language
 * @returns {TafsirInfo}
 */
export const getFirstTafsirOfLanguage = (
  tafsirListData: TafsirsResponse,
  language: string,
): TafsirInfo | undefined => {
  const selectedTafsir = tafsirListData?.tafsirs?.find((tafsir) => tafsir.languageName === language)
  return selectedTafsir
}

/**
 * Given list of tafsirs, get all available language options
 *
 * @param {Tafsir[]} tafsirs
 * @returns {string[]} list of available language options
 */
export const getTafsirsLanguageOptions = (tafsirs: Tafsir[]): string[] =>
  uniq(
    tafsirs
      .map((tafsir) => tafsir.languageName)
      .filter((language): language is string => language !== undefined),
  ).filter((language) => language === 'arabic' || language === 'english')
