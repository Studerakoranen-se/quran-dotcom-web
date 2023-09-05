/* eslint-disable no-console */
import * as React from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import LessonFileForm from '~/components/admin/Forms/LessonFileForm'

const EditLessonFilePage = () => {
  const router = useRouter()
  const [lessonFile, setLessonFile] = React.useState()
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
  React.useEffect(() => {
    fetch(`/api/v1/file/details?id=${router.query.id}`, {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => setLessonFile(result))
      .catch((error) => console.log('error', error))
  }, [router.query.id])
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="flex flex-col gap-5 mb-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold dark:text-white-light">Edit Lesson</h5>
        </div>
        {lessonFile && <LessonFileForm lessonFile={lessonFile} lessons={lessons} />}
      </div>
    </DefaultLayout>
  )
}

export default EditLessonFilePage
