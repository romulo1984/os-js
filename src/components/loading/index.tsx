import React from 'react'
import Image from 'next/image'
import styles from './index.module.scss'

export const Loading = () => (
  <div className={styles.loading}>
    <Image
      src="/img/loading.gif"
      alt="Loading..."
      width={24}
      height={24}
    />
  </div>
)