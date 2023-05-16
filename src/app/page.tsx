import styles from './page.module.scss'
import { Test } from '@/components/test'

export default function Desktop() {
  return (
    <main className={styles.main}>
      <div className={styles.test}>
        <Test />
      </div>
    </main>
  )
}
