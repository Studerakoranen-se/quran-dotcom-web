import { IconButton, Tooltip } from '@mui/material'
import { useMemo } from 'react'
import { useI18n } from '~/contexts'
import { toLocalizedNumber } from '~/utils/locale'
import { MinusIcon, PlusIcon } from '../icons'
import styles from './Counter.module.scss'

type CounterProps = {
  count: number | string
  onIncrement?: () => void | null
  onDecrement?: () => void | null
  isPercent?: boolean
  locale: string
}

/**
 *
 * @param {CounterProps} props - the props of the this component
 * @param {number} props.count - the current count
 * @param {boolean} props.isPercent - should show a percent instead of a number if true
 * @param {() => void} props.onIncrement - the function to call when the increment button is clicked.
 * Button is disabled when  the value is `undefined` or `null`
 * @param {() => void} props.onDecrement - the function to call when the decrement button is clicked.
 * Button is disabled when  the value is `undefined` or `null`
 * @returns {JSX.Element}
 */
const Counter = ({
  count,
  onIncrement,
  onDecrement,
  isPercent,
  locale,
}: CounterProps): JSX.Element => {
  const { t } = useI18n()
  const percent = Number(count) * 100
  const localizedCount = useMemo(() => toLocalizedNumber(Number(count), locale), [count, locale])
  const localizedPercent = useMemo(
    () => toLocalizedNumber(Number(percent), locale),
    [percent, locale],
  )
  return (
    <div className={styles.container}>
      <Tooltip title={t('counter').translate('decrease')}>
        <IconButton
          aria-label={t('counter').translate(`decrease`)}
          onClick={onDecrement}
          disabled={!onDecrement}
        >
          <MinusIcon />
        </IconButton>
      </Tooltip>
      {isPercent ? (
        <span className={styles.count}>{`${localizedPercent} %`}</span>
      ) : (
        <span className={styles.count}>{localizedCount}</span>
      )}
      <Tooltip title={t('counter').translate('increase')}>
        <IconButton
          aria-label={t('counter').translate(`increase`)}
          onClick={onIncrement}
          disabled={!onIncrement}
        >
          <PlusIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default Counter
