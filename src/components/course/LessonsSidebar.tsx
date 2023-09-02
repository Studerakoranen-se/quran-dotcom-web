import * as React from 'react'

const LessonsSidebar = (props: any) => {
  const { lessons, lessonID, setLesson } = props

  const getlesson = (id: number) => {
    fetch(`/api/v1/lesson/details?id=${id}`, {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => setLesson(result))
      .catch((error) => console.log('error', error))
  }

  React.useEffect(() => {
    if (!lessonID) {
      getlesson(lessons[0]?.id)
    }
  }, [lessons])
  return (
    <div className="text-white text-sm w-full space-y-3">
      {lessons.map((lesson: any, i: number) => (
        <button
          onClick={() => getlesson(lesson.id)}
          key={i}
          className={`${
            lessonID === lesson.id ? 'bg-[#065050]' : ''
          } flex justify-between w-full py-1.5 px-2 rounded-lg hover:bg-[#065050]`}
        >
          <div className="">{lesson.name}</div>
          <div className="">{lesson.duration}</div>
        </button>
      ))}
    </div>
  )
}

export default LessonsSidebar
