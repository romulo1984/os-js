import { db } from '@/db'
import { IFile } from '@/db/types'
import { useLiveQuery } from 'dexie-react-hooks'

export const useFiles = () => {
  return useLiveQuery(async () => {
    const files: Array<IFile> = []
    await db.files.each(async (file) => {
      const newFile: IFile = {
        ...file,
        children: []
      }
      await db.files.where('parentId').equals(file.id || 0).each((child: IFile) => {
        newFile.children?.push(child)
      })

      files.push(newFile)
    })
    
    return files
  }, [])
}

export const getFile = async (id: number) => db.files.get(id)

export const createFile = async (File: IFile) => {
  try {
    const newFile: IFile = {
      name: File.name,
      type: File.type,
      content: File.content,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    if (File.parentId) {
      const parent = await getFile(File.parentId)
      if (parent) {
        newFile.parentId = File.parentId
      }
    }

    return await db.files.add(newFile)
  } catch (error) {
    console.log('error', error)
  }
}

export const removeFile = async (id: number) => db.files.delete(id)