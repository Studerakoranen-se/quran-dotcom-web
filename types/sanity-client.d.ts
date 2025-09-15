// Override problematic Sanity client types
declare module '@sanity/client' {
  export * from '@sanity/client/dist/index'
}

declare module '@sanity/client/dist/index' {
  // Add any specific type overrides if needed
  export interface SanityClient {
    fetch: (query: string, params?: any) => Promise<any>
    // Add other methods as needed
  }
}
