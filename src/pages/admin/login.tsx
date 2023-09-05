/* eslint-disable no-console */
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
// import { IRootState } from '~/store'
import { setPageTitle } from '~/store/themeConfigSlice'
import BlankLayout from '~/components/Layout/BlankLayout'
import { createUser } from '~/store/userSlice'

const LoginBoxed = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setPageTitle('Login Boxed'))
  })
  const router = useRouter()
  // const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark'

  const [error, setError] = React.useState()

  const submitForm = (e: any) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('email', e.target.email.value)
    formdata.append('password', e.target.password.value)

    fetch('/api/v1/login', {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then(({ success, msg, data }) => {
        if (success) {
          dispatch(createUser(data))
          router.push('/admin')
        } else {
          setError(msg)
        }
        console.log(msg)
      })
      .catch((errors) => console.log('error', errors))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
      <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
        <h2 className="mb-3 text-2xl font-bold">Sign In</h2>
        <p className="mb-2">Enter your email and password to login</p>
        <p className="my-3 text-red-500">{error}</p>
        <form className="space-y-5" onSubmit={submitForm}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter Password"
            />
          </div>

          <button type="submit" className="w-full btn btn-primary">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  )
}
LoginBoxed.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>
}
export default LoginBoxed
