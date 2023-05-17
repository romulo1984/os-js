import styles from './page.module.scss'
import { Desktop } from '@/components/desktop'

export default function Main() {
  return (
    <main className={styles.main}>
      <Desktop />
    </main>
  )
}
