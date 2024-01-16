import React, { useCallback, useContext } from 'react'
import { useSelector } from '@xstate/react'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import DataFetcher from '~/components/DataFetcher'
import { CheckIcon } from '~/components/icons'
import usePersistPreferenceGroup from '~/hooks/auth/usePersistPreferenceGroup'
// import ChevronLeftIcon from '@/icons/chevron-left.svg';
import { makeAvailableRecitersUrl } from '~/utils/apiPaths'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { RecitersResponse } from '~/types/ApiResponses'
import PreferenceGroup from '~/types/auth/PreferenceGroup'
import Reciter from '~/types/Reciter'
import styles from './SelectReciterMenu.module.scss'

const DEFAULT_RECITATION_STYLE = 'Murattal'

const SelectReciterMenu = ({ onBack }) => {
  const router = useRouter()
  const audioService = useContext(AudioPlayerMachineContext)
  const selectedReciterId = useSelector(audioService, (state) => state.context.reciterId)

  const {
    actions: { onXstateSettingsChange },
    isLoading,
  } = usePersistPreferenceGroup()

  const onReciterSelected = useCallback(
    (reciter: Reciter) => {
      const previousReciterId = selectedReciterId
      onXstateSettingsChange(
        'reciter',
        reciter.id,
        () => audioService.send({ type: 'CHANGE_RECITER', reciterId: reciter.id }),
        () => audioService.send({ type: 'CHANGE_RECITER', reciterId: previousReciterId }),
        PreferenceGroup.AUDIO,
        onBack,
      )
    },
    [audioService, onBack, onXstateSettingsChange, selectedReciterId],
  )

  const getItemIcon = useCallback(
    (reciterId: number, newlySelectedReciterId: number) => {
      if (newlySelectedReciterId === reciterId) {
        if (isLoading) {
          return <CircularProgress />
        }
        return <CheckIcon />
      }
      return <span />
    },
    [isLoading],
  )

  const renderReciter = useCallback(
    (data: RecitersResponse) => {
      return (
        <div>
          {data.reciters.map((reciter) => (
            <PopoverMenu.Item
              key={reciter.id}
              icon={getItemIcon(reciter.id, selectedReciterId)}
              onClick={() => {
                logButtonClick('audio_player_overflow_menu_reciter_item')
                logValueChange('reciter', selectedReciterId, reciter.id)
                logItemSelectionChange('reciter', reciter.id)
                onReciterSelected(reciter)
              }}
            >
              {reciter.translatedName.name}
              {reciter.style.name !== DEFAULT_RECITATION_STYLE && (
                <p className={styles.reciterStyle}>{` - ${reciter.style.name}`}</p>
              )}
            </PopoverMenu.Item>
          ))}
        </div>
      )
    },
    [getItemIcon, selectedReciterId, onReciterSelected],
  )

  const reciters = (
    <DataFetcher queryKey={makeAvailableRecitersUrl(router.locale)} render={renderReciter} />
  )

  return (
    <React.Fragment>
      {/* <PopoverMenu.Item icon={<ChevronLeftIcon />} onClick={onBack} shouldFlipOnRTL>
        {t('audio.select-reciter')}
      </PopoverMenu.Item> */}
      {/* <PopoverMenu.Divider /> */}
      {reciters}
    </React.Fragment>
  )
}

export default SelectReciterMenu
