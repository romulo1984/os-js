import { IFile } from '@/db/types'
import Image from 'next/image'
import { SETTINGS } from '@/utils/constants'
import styles from './index.module.scss'

type FileProps = {
  file: IFile
  size?: number
}

export const File = ({ file, size = 52 }: FileProps) => {
  const type = file.type.replace('/', '-')
  const src = `${SETTINGS.icons_path}mimes/scalable/${type}.svg`

  return (
    <div className={styles.file}>
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