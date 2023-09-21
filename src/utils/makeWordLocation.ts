/**
 * make wordLocation from verseKey and wordPosition, example "1:1:2"
 *
 * @param {string} verseKey
 * @param {string} wordPosition
 * @returns {string} wordLocation
 */
const makeWordLocation = (verseKey: string, wordPosition: number): string =>
  `${verseKey}:${wordPosition}`

export default makeWordLocation
