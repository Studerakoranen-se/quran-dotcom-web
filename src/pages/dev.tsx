import { useRouter } from 'next/router'
import * as React from 'react'

const DevPage = () => {
  const router = useRouter()
  const { pass } = router.query

  React.useEffect(() => {
    if (pass && pass === 'novatech') {
      localStorage.setItem('devmode', 'truefornovatech')
      router.push('/')
    } else {
      console.log('error')
    }
  }, [pass])

  console.log('c')

  return <div className="flex justify-center items-center min-h-screen" />
}

export default DevPage
