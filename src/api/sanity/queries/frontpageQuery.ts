import pageQuery, { PageQueryResult } from './partials/pageQuery'

export type FrontpageQueryResult = PageQueryResult

export default `
  coalesce(
    *[_type == 'generalSettings' && _id in path("drafts.**") && $preview][0],
    *[_type == 'generalSettings' && !(_id in path("drafts.**"))][0]
  ) {
    ...coalesce(
      frontpage->__i18n_refs[$locale match _key][0]->,
      frontpage->
    ){${pageQuery}},
  }
`
