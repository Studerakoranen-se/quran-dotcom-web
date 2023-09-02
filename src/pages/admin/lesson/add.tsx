import * as React from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import LessonForm from '~/components/admin/Forms/LessonForm'

const AddLessonPage = () => {
  const [courses, setCourses] = React.useState([])

  React.useEffect(() => {
    fetch('/api/v1/course/list', {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)

        const output = result.map(({ id, name }) => ({
          label: name,
          value: id,
        }))
        setCourses(output)
      })
      .catch((error) => console.log('error', error))
  }, [])
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold dark:text-white-light">Add Lesson</h5>
        </div>
        <LessonForm courses={courses} />
      </div>
    </DefaultLayout>
  )
}

export default AddLessonPage
