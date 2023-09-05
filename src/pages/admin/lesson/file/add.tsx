/* eslint-disable no-console */
import * as React from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import LessonFileForm from '~/components/admin/Forms/LessonFileForm'

const AddLessonFilePage = () => {
  const [lessons, setLessons] = React.useState([])

  React.useEffect(() => {
    fetch('/api/v1/lesson/list', {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        const output = result.map(({ id, name }) => ({
          label: name,
          value: id,
        }))
        setLessons(output)
      })
      .catch((error) => console.log('error', error))
  }, [])
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="flex flex-col gap-5 mb-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold dark:text-white-light">Add Lesson File</h5>
        </div>
        <LessonFileForm lessons={lessons} />
      </div>
    </DefaultLayout>
  )
}

export default AddLessonFilePage
