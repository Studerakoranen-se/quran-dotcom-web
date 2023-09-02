import * as React from 'react'

const QuizeTab = (props: any) => {
  const { lessonID } = props
  const [quizes, setQuizes] = React.useState([])

  React.useEffect(() => {
    fetch(`/api/v1/quize/list?lesson_id=${lessonID}`, {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => setQuizes(result))
      .catch((error) => console.log('error', error))
  }, [lessonID])
  return (
    <div>
      <h1 className="pb-5 text-xl">Quiz</h1>
      <form className="space-y-5">
        {quizes.map((quize: any, i: number) => (
          <div key={i} className="border border-[#365F5F] rounded-lg px-5 py-2">
            <h1 className="pb-2">{`${i + 1}. ${quize.question}`}</h1>
            <label
              htmlFor={`o1q${quize.id}`}
              className="cursor-pointer flex items-center gap-2 font-light"
            >
              <input
                id={`o1q${quize.id}`}
                type="radio"
                name={`q${quize.id}`}
                className="rounded-full"
              />
              a) {quize.o1}
            </label>
            <label
              htmlFor={`o2q${quize.id}`}
              className="cursor-pointer flex items-center gap-2 font-light"
            >
              <input
                id={`o2q${quize.id}`}
                type="radio"
                name={`q${quize.id}`}
                className="rounded-full"
              />
              b) {quize.o2}
            </label>
            <label
              htmlFor={`o3q${quize.id}`}
              className="cursor-pointer flex items-center gap-2 font-light"
            >
              <input
                id={`o3q${quize.id}`}
                type="radio"
                name={`q${quize.id}`}
                className="rounded-full"
              />
              c) {quize.o3}
            </label>
            <label
              htmlFor={`o4q${quize.id}`}
              className="cursor-pointer flex items-center gap-2 font-light"
            >
              <input
                id={`o4q${quize.id}`}
                type="radio"
                name={`q${quize.id}`}
                className="rounded-full"
              />
              d) {quize.o4}
            </label>
          </div>
        ))}
        <button type="submit" className="bg-white text-black rounded-full px-5 py-1.5">
          Submit
        </button>
      </form>
    </div>
  )
}

export default QuizeTab
