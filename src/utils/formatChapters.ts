interface SingleChapter {
  id?: number
  revelation_place: string
  revelation_order: number
  bismillah_pre: boolean
  name_simple: string
  name_arabic: string
  verses_count: number
  chapter_number: number
  translated_name: {
    language_name: string
    name: string
  }
  pages: Array<number>
}

export default function formatChapters(chapter: SingleChapter, locale = 'sv') {
  return {
    ...chapter,
    id: chapter.id,
    chapterNumber: chapter?.chapter_number || null,
    evelationPlace: chapter.revelation_place,
    versesCount: chapter.verses_count || 1,
    revelationOrder: chapter.revelation_order,
    bismillahPre: chapter.bismillah_pre,
    nameSimple: chapter.name_simple,
    nameArabic: chapter.name_arabic,
    transliteratedName: locale === 'ar' ? chapter.name_arabic : chapter.name_simple,
    translatedName: locale === 'ar' ? chapter.name_arabic : chapter.translated_name.name,
  }
}
