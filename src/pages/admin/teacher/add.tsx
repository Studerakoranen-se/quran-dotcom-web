import DefaultLayout from '~/components/Layout/DefaultLayout'
import TeacherForm from '~/components/admin/Forms/TeacherForm'

const AddTeacherPage = () => {
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold dark:text-white-light">Add Teacher</h5>
        </div>
        <TeacherForm />
      </div>
    </DefaultLayout>
  )
}

export default AddTeacherPage
