import formatStringNumber from "./formatStringNumber";

type ChaptersData = Record<string, Chapter>;

/**
 * Get chapter data by id
 *
 * @param {ChaptersData} chapters
 * @param {string} id
 * @returns {Chapter} chapter
 */
export const getChapterData = (chapters: ChaptersData, id: string): Chapter => {
    return chapters[formatStringNumber(id)];
}


export default getChapterData
