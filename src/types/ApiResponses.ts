import Chapter from './Chapter'

export interface BaseResponse {
  status?: number
  error?: string
}

// The response from the chapters endpoint that returns a list of the chapters
export interface ChaptersResponse extends BaseResponse {
  chapters: Chapter[]
}

// The response from the chapter endpoint that returns information on a chapter
export interface ChapterResponse extends BaseResponse {
  chapter: Chapter
}

export interface AudioTimestampsResponse extends BaseResponse {
  result: {
    timestampFrom: number
    timestampTo: number
  }
}

export interface AdvancedCopyRawResultResponse extends BaseResponse {
  result?: string
}
