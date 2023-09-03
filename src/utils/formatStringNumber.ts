/**
 * This function returns a number string after making sure
 * it's in the valid format. e.g.
 * 1   -> 1
 * 001 -> 1
 *
 * @param {string} number
 * @returns {string}
 */
const formatStringNumber = (number: string): string => String(Number(number));

export default formatStringNumber
