import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { RouterLink } from '~/containers'

// reference: https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing
type ErrorProps = {
  statusCode?: number
}

const Error = () => {
  const router = useRouter()

  // if previous page url exist, go back, otherwise go to home
  const onBackButtonClicked = () => {
    if (document && document.referrer) {
      router.back()
      return
    }
    router.push('/') // go to home
  }
  return (
    <div>
      <h1>Error</h1>
      <div>
        <Button onClick={onBackButtonClicked}>Go Back</Button>
      </div>
      <p>
        if persist
        <RouterLink href="http://studerakoranen.nu/">report here</RouterLink>
      </p>
    </div>
  )
}

export default Error
