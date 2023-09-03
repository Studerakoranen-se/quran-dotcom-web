import dynamic from 'next/dynamic'

export const AppBaseCookieBar = dynamic(
  () => import(/* webpackChunkName: "layouts/AppBaseCookieBar" */ './AppBaseCookieBar'),
  { ssr: false },
)

export { default as AppBaseLoader } from './AppBaseLoader'
export { default as AppBaseLanguageDialog } from './AppBaseLanguageDialog'
export { default as AppBaseSkipLink } from './AppBaseSkipLink'
