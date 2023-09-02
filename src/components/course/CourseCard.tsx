import Link from 'next/link'

const CourseCard = (props: any) => {
  const { course } = props
  return (
    <div className="grid md:grid-cols-3 md:gap-5 items-center shadow-2xl shadow-black bg-white overflow-hidden rounded-2xl md:h-56">
      <div className="relative w-full h-48 md:h-full overflow-hidden ">
        <img src={`/api/image?name=${course.image}`} alt="" className=" h-full w-full" />
      </div>
      <div className="h-full flex flex-col md:col-span-2 text-xl text-[#043B3B] p-6 z-50">
        <h1 className="font-bold pb-2">{course.name}</h1>
        <div
          className="text-xs text-[#365F5F] space-y-2 flex-grow"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: course.description,
          }}
        />
        <div className="mt-5">
          <Link
            href={`/course/${course.id}`}
            className={
              'bg-[#043B3B] px-6 lg:px-14 py-2 text-sm text-white font-semibold rounded-full'
            }
          >
            KLICKA HÄR
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
