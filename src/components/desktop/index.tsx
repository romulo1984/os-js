'use client'
import React from 'react'
import { useFiles, isOpen, createFile } from '@/service/system'
import { Loading } from '@/components/loading'
import { File } from '@/components/file'
import { IFile } from '@/db/types'
import styles from './index.module.scss'

export const Desktop = () => {
  const files = useFiles()

  const create = () => {
    createFile({ name: 'Menor sim', type: 'text/plain', content: '' })
  }

  return (
    <div className={styles.desktop}>
      { !isOpen() ? <Loading /> : files?.map((file: IFile, k) => (<File key={k} file={file}/>)) }
      <button onClick={create}>Create</button>
    </div>
  )
}