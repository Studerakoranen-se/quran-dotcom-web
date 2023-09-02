import { ImFilePlay, ImFileText2 } from 'react-icons/im'
import { FaFilePdf } from 'react-icons/fa'
import * as React from 'react'

const ResourcesTab = (props: any) => {
  const { lesson, lessonCount } = props
  const [files, setFiles] = React.useState([])

  React.useEffect(() => {
    fetch(`/api/v1/file/list?lesson_id=${lesson.id}`, {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => setFiles(result))
      .catch((error) => console.log('error', error))
  }, [lesson])
  return (
    <div className="font-light">
      <h1 className="font-medium">Course Summary</h1>
      <div
        className="space-y-3 py-3"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: lesson?.description,
        }}
      />
      {/* Resource count  */}
      <div className="flex gap-10 my-3">
        <div className="flex items-center gap-2">
          <ImFilePlay />
          <p>{lessonCount} lessons</p>
        </div>
        <div className="flex items-center gap-2">
          <ImFileText2 />
          <p>{files.length} files</p>
        </div>
      </div>
      {/* Files */}
      <div className="mt-10">
        <h1 className="font-medium mb-5">Download Resources</h1>
        <div className="space-y-3">
          {files.map((file: any, i: number) => (
            <a
              key={i}
              href={file.file}
              target="_blank"
              rel="noreferrer"
              className="bg-[#365F5F] hover:bg-[#427474] transition-all px-5 py-2 rounded flex justify-between items-center w-full"
            >
              <div className="">{`${i + 1}. ${file.name}`}</div>
              <div className="">
                <FaFilePdf className="fill-red-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResourcesTab
