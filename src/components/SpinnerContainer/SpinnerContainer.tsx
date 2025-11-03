import { CircularProgress } from '@mui/material'
import React from 'react'
import styles from './SpinnerContainer.module.scss'

type Props = {
  children: React.ReactNode
  isLoading: boolean
}

const SpinnerContainer: React.FC<Props> = ({ children, isLoading }) => {
  return (
    <div className={styles.internalContainer}>
      {children}
      {isLoading && <CircularProgress className={styles.spinner} />}
    </div>
  )
}

export default SpinnerContainer
