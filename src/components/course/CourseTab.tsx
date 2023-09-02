const CourseTab = (props: any) => {
  const { tab, setTab } = props

  return (
    <div className="flex items-center gap-10 border-b-2 border-[#365F5F] ">
      <button
        onClick={() => setTab('about')}
        className={`${tab === 'about' ? 'border-b-2 border-[#679898] -mb-0.5' : ''} pb-2`}
      >
        About
      </button>
      <button
        onClick={() => setTab('resources')}
        className={`${tab === 'resources' ? 'border-b-2 border-[#679898] -mb-0.5' : ''} pb-2`}
      >
        Resources
      </button>
      <button
        onClick={() => setTab('quiz')}
        className={`${tab === 'quiz' ? 'border-b-2 border-[#679898] -mb-0.5' : ''} pb-2`}
      >
        Quiz
      </button>
    </div>
  )
}

export default CourseTab
