import * as React from 'react'
import CourseCard from './CourseCard'

const CourseList = () => {
  const [courses, setCourses] = React.useState([])

  React.useEffect(() => {
    fetch('/api/v1/course/list', {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => setCourses(result))
      // eslint-disable-next-line no-console
      .catch((error) => console.log('error', error))
  }, [])

  return (
    <div className="container pt-16 text-white">
      <h1 className="text-4xl text-center font-elMessiri">Våra Kurser</h1>
      <p className="max-w-2xl py-5 mx-auto text-sm text-center text-gray-300">
        Våra kurser är specialanpassade för att erbjuda högkvalitativ undervisning, precisionell
        pedagogik och unikt material. Välj den nivån som passar dig!
      </p>
      <div className="py-10 mx-auto space-y-10">
        {courses.map((course: any, i: number) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>
    </div>
  )
}

export default CourseList
