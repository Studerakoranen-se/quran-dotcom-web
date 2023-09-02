import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import * as React from 'react'
import dynamic from 'next/dynamic'
import TextField from '../Fields/TextField'
import InputField from '../Fields/InputField'
import 'react-quill/dist/quill.snow.css'
import PanelSelectField from '../Fields/PanelSelectField'

const ReactQuill = dynamic(import('react-quill'), { ssr: false })

type Props = {
  lesson?: any
  courses?: any
}

const LessonForm = ({ lesson, courses }: Props) => {
  const router = useRouter()
  const [content, setContent] = React.useState('')

  React.useEffect(() => {
    setContent(lesson?.content)
  }, [lesson?.content])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formdata = new FormData()

    formdata.append('course_id', e.target.course_id.value)
    formdata.append('name', e.target.name.value)
    formdata.append('youtube_video', e.target.youtube_video.value)
    formdata.append('description', e.target.description.value)
    formdata.append('content', content)
    if (lesson) {
      fetch(`/api/v1/lesson/update?id=${lesson.id}`, {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      })
        .then((response) => response.json())
        .then(({ success, msg, result }) => {
          Swal.fire({
            icon: success ? 'success' : 'error',
            title: success ? 'Success' : 'Error',
            text: msg,
            padding: '2em',
            customClass: 'sweet-alerts',
          })
        })
        .catch((error) => console.log('error', error))
    } else {
      fetch('/api/v1/lesson/add', {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      })
        .then((response) => response.json())
        .then(({ success, msg, result }) => {
          if (success) {
            router.push('/admin/lesson/list')
          }
        })
        .catch((error) => console.log('error', error))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <PanelSelectField
        label="Course"
        name="course_id"
        options={courses}
        defaultValue={lesson?.course_id}
      />
      <InputField
        name="name"
        label="Name"
        required
        placeholder="isUJXYdhkpg"
        defaultValue={lesson?.name}
      />
      <InputField
        name="youtube_video"
        label="Youtube video ID"
        required
        placeholder="lesson name ..."
        defaultValue={lesson?.youtube_video}
      />
      <TextField
        name="description"
        label="Description"
        required
        placeholder="Write description.."
        defaultValue={lesson?.description}
      />
      <div className="">
        <label htmlFor={'content'}>Content</label>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
      </div>
      <button type="submit" className="btn btn-primary w-max px-10">
        Submit
      </button>
    </form>
  )
}

export default LessonForm
