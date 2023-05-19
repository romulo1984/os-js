'use client'
import React, { useState } from 'react'
import { isOpen, createFile, useFolderFiles } from '@/service/system'
import { Loading } from '@/components/loading'
import { File } from '@/components/file'
import { IFile } from '@/db/types'
import styles from './index.module.scss'
import { Menu } from '@/components/menu'

export const Desktop = () => {
  const files = useFolderFiles('Desktop')
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [type, setType] = useState('text/plain')
  const [showForm, setShowForm] = useState(false)

  const create = () => {
    if (name.length === 0) return
    if (type.length === 0) return

    createFile({
      name,
      type,
      content
    })
    setName('')
    setContent('')
  }

  return (
    <div className={styles.desktop}>
      { !isOpen() ? <Loading /> : files?.map((file: IFile, k) => (
        <File key={k} file={file}/>
      )) }
      <Menu id='desktop' />

      <div className={styles.tempCreateFile}>
        <button onClick={() => setShowForm(!showForm)}>Add</button>
        {showForm && <div className={styles.form}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>

          <label htmlFor="content">Content</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>

          <label htmlFor="type">Name</label>
          <input id="type" type="text" value={type} onChange={(e) => setType(e.target.value)}/>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="text/plain">Txt</option>
            <option value="image/png">PNG</option>
            <option value="application/pdf">PDF</option>
          </select>
          <button onClick={create}>Create</button>
        </div>}
      </div>
    </div>
  )
}