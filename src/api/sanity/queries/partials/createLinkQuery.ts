export type LinkQueryResult =
  | NonNullable<Sanity.ProductionWorkspace.Schema.Link>['url']
  | NonNullable<NonNullable<Sanity.ProductionWorkspace.Schema.Page>['uri']>['current']
  | undefined

export default function createLinkQuery(fieldName: string) {
  return `
    coalesce('/' + ${fieldName}.reference->uri.current, ${fieldName}.url, '')
  `
}
