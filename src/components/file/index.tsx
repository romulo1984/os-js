import { IFile } from '@/db/types'
import Image from 'next/image'
import { SETTINGS } from '@/utils/constants'
import styles from './index.module.scss'
import { useContextMenu, TriggerEvent } from 'react-contexify'

type FileProps = {
  file: IFile
  size?: number
}

export const File = ({ file, size = 52 }: FileProps) => {
  const { show } = useContextMenu({ id: 'desktop', props: { file } })
  const type = file.type.replace('/', '-')
  const src = `${SETTINGS.icons_path}mimes/scalable/${type}.svg`

  const displayMenu = (e: TriggerEvent) => {
    show({ event: e })
  }

  return (
    <div onContextMenu={displayMenu} className={styles.file}>
      <Image
        src={src}
        width={size}
        height={size}
        alt={file.name}
      />
      <p>{file.name}</p>
    </div>
  )
}