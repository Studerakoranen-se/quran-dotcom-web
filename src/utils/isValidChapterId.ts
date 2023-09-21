const isValidChapterId = (chapterId: string): boolean => {
  const chapterIdNumber = Number(chapterId)
  // if it's not a numeric string or it's numeric but out of the range of chapter 1->114
  if (Number.isNaN(chapterIdNumber) || chapterIdNumber > 114 || chapterIdNumber < 1) {
    return false
  }
  return true
}

export default isValidChapterId
