import * as React from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import LessonForm from '~/components/admin/Forms/LessonForm'

const EditLessonPage = () => {
  const router = useRouter()
  const [courses, setCourses] = React.useState([])
  const [lesson, setLesson] = React.useState()

  React.useEffect(() => {
    fetch('/api/v1/course/list', {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        const output = result.map(({ id, name }) => ({
          label: name,
          value: id,
        }))
        setCourses(output)
      })
      .catch((error) => console.log('error', error))
    fetch(`/api/v1/lesson/details?id=${router.query.id}`, {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => setLesson(result))
      .catch((error) => console.log('error', error))
  }, [router.query.id])
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold dark:text-white-light">Edit Lesson</h5>
        </div>
        {lesson && <LessonForm courses={courses} lesson={lesson} />}
      </div>
    </DefaultLayout>
  )
}

export default EditLessonPage
