import { useRouter } from 'next/router'
import { getDir } from '~/utils/locale'

const useDirection = (): string => {
  const { locale } = useRouter()
  // @ts-ignore
  return getDir(locale)
}

export default useDirection
