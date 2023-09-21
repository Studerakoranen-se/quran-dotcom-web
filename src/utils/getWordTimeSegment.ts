const getTimingSegment = (verseTiming: any, wordPosition: number) =>
  verseTiming.segments.find(([location]) => wordPosition === location)

const getWordTimeSegment = (verseTimings: any, word: any) => {
  const verseTiming = verseTimings.find((timing) => timing.verseKey === word.verseKey)
  if (!verseTiming) return null
  const segment = getTimingSegment(verseTiming, word.position)
  if (segment) return [segment[1], segment[2]]
  return null
}

export default getWordTimeSegment
