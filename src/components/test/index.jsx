'use client'
import { useState } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import { createFile, removeFile, useFiles } from '@/service/system'

export const Test = () => {
  const [file, setFile] = useState({ name: '' })
  const files = useFiles()
  console.log('files', files)

  const newFile = () => {
    createFile({
      name: file.name,
      type: 'text/plain',
      content: `<h2>Olá, pessoal</h2>`,
      parentId: 10
    })
  }

  return (
    <div>
      <input
        value={file.name}
        onChange={(event) => setFile({ name: event.target.value })}
        type="text"
      />
      <button onClick={newFile}>adicionar arquivo</button>
      <div>
        {files?.map((file) => {
          return (
            <div key={file.id} className={style.file}>
              <Image
                src="/GoogleChrome.ico"
                width={128}
                height={128}
                alt="folder"
              />
              <h3>{file.name}: {file.parentId}</h3>
              <pre>
                <code>{file.content}</code>
              </pre>
              <button onClick={() => removeFile(file.id)}>remove</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}