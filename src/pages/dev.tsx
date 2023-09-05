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
      // eslint-disable-next-line no-console
      console.log('error')
    }
  }, [pass, router])

  return <div className="flex items-center justify-center min-h-screen" />
}

export default DevPage
