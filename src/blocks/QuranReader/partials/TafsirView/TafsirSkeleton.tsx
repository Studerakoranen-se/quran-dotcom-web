import classNames from 'classnames'
import range from 'lodash/range'
import * as React from 'react'
import { Skeleton } from '~/components'
import styles from './TafsirView.module.scss'

const TafsirSkeleton = () => {
  return (
    <React.Fragment>
      <Skeleton className={classNames(styles.tafsirSkeletonItem, styles.ayahSekletonItem)} />
      {range(1, 15).map((i) => (
        <Skeleton
          key={i}
          className={classNames(styles.tafsirSkeletonItem, {
            [styles.tafsirSkeletonItem1]: i % 1 === 0,
            [styles.tafsirSkeletonItem2]: i % 2 === 0,
            [styles.tafsirSkeletonItem3]: i % 3 === 0,
          })}
        />
      ))}
    </React.Fragment>
  )
}

export default TafsirSkeleton
