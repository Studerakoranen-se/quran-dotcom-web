interface Juz {
    id?: number
    first_verse_id: number
    juz_number: number
    last_verse_id: number
    verses_count: number
    verse_mapping: {
        [key: string]: string
    }
}

export default function formatJuzs(juzs: Juz[]) {
    return juzs?.map((juz) => {
        return {
            id: juz.id,
            versesCount: juz.verses_count,
            firstVerseId: juz.first_verse_id,
            juzNumber: juz.juz_number,
            lastVerseId: juz.last_verse_id,
            verseMapping: juz.verse_mapping

        }
    })
}
