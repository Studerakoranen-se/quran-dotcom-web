export interface LessonBlockQueryResult {
  id?: string
  title?: string
  description?: string
  lessons: {
    title: string
    duration?: string
    youtubeVideo: string
    summary: string
    resources: {
      title: string
      file: string
    }[]
    questions: {
      title: string
      file: string
    }[]
    uri: string
  }[]
}

export default `
  "title": ^.title,
  'description': ^.description,
  'lessons': lessons[]->{
    title,
    'uri': uri.current,
    youtubeVideo,
    summary,
    questions,
    resources[]{
      title,
      'file': file.asset->url
    }
  }
`
