import useSWRImmutable from 'swr/immutable'
import curatedStations from '~/components/Radio/curatedStations'
import { StationInfo, StationType } from '~/components/Radio/types'
import { makeReciterUrl } from '~/utils/apiPaths'
import { getReciterData } from '~/api'
import RadioContext from '../actors/radio/types/RadioContext'

const useCurrentStationInfo = (context: RadioContext): StationInfo => {
  const stationState = context

  const { data: reciterData } = useSWRImmutable(
    stationState.type === StationType.Reciter
      ? makeReciterUrl(stationState.id as string, 'sv')
      : null,
    () => getReciterData(stationState.id as string, 'sv'),
  )

  const getCuratedStationInfo = (): StationInfo => {
    const curatedStation = curatedStations[stationState.id as string]
    return {
      title: `curated-station.${curatedStation.title}`,
      description: `curated-station.${curatedStation.description}`,
    }
  }

  const getReciterStationInfo = (): StationInfo => {
    const selectedReciter = reciterData?.reciter
    return {
      title: selectedReciter?.translatedName?.name as string,
      description: selectedReciter?.style?.name as string,
    }
  }

  if (stationState.type === StationType.Curated) return getCuratedStationInfo()
  return getReciterStationInfo()
}

export default useCurrentStationInfo
