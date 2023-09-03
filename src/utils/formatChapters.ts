interface Chapter {
    id?: number
    revelation_place: string
    revelation_order: number
    bismillah_pre: boolean
    name_simple: string
    name_arabic: string
    verses_count: number
    translated_name: {
        language_name: string
        name: string
    }
}

export default function formatChapters(chapters: Chapter[], locale: string) {
    return chapters?.map((chapter) => {
        return {
            id: chapter.id,
            evelationPlace: chapter.revelation_place,
            transliteratedName:
                locale === 'ar' ? chapter.name_arabic : chapter.name_simple,
            versesCount: chapter.verses_count,
            revelationOrder: chapter.revelation_order,
            bismillahPre: chapter.bismillah_pre,
            translatedName:
                locale === 'ar' ? chapter.name_arabic : chapter.translated_name.name,
        }
    })
}
