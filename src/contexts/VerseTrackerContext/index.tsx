import * as React from 'react'

interface VerseTrackerContextType {
  // this will store a queue of verse keys that have been read by the user
  verseKeysQueue: React.MutableRefObject<Set<string>>
  shouldTrackObservedVerses: React.MutableRefObject<boolean>
}

// @ts-ignore
const VerseTrackerContext = React.createContext<VerseTrackerContextType>({
  // @ts-ignore
  verseKeysQueue: new Set(),
  // @ts-ignore
  shouldTrackObservedVerses: true,
})

type VerseTrackerContextProviderProps = {
  children: React.ReactNode
}
export function VerseTrackerContextProvider(props: VerseTrackerContextProviderProps) {
  const { children } = props

  const verseKeysQueue = React.useRef<Set<string>>(new Set())
  const shouldTrackObservedVerses = React.useRef(true)

  const value = React.useMemo(() => ({ verseKeysQueue, shouldTrackObservedVerses }), [])

  return <VerseTrackerContext.Provider value={value}>{children}</VerseTrackerContext.Provider>
}

export const useVerseTrackerContext = () => React.useContext(VerseTrackerContext)
