import { db } from '@/db'
import { IFile } from '@/db/types'
import { useLiveQuery } from 'dexie-react-hooks'
import { FILE_STATUS } from '@/utils/constants'

const { ACTIVE, DELETED } = FILE_STATUS

export const useFolderFiles = (name: string) => {
  return useLiveQuery(async () => {
    const folder = await db.files
      .filter(file => file.type === 'folder' && file.status === ACTIVE)
      .first()

    return db.files
      .filter(file => file.parentId === folder?.id && file.status === ACTIVE)
      .toArray()
  })
}

export const useAllFolders = () => useLiveQuery(async () => {
  return db.files
    .filter(file => file.type === 'folder' && file.status === ACTIVE)
    .toArray()
})

export const getFile = async (id: number) => db.files
  .filter(file => file.type !== 'folder' && file.status === ACTIVE)
  .and((file: IFile) => file.id === id)
  .first()

export const getFolder = async (id: number) => db.files
  .filter(file => file.type === 'folder' && file.status === ACTIVE)
  .and((file: IFile) => file.id === id)
  .first()

export const createFile = async (File: IFile) => {
  try {
    if (File.type === 'folder') {
      throw new Error('Cannot create folder using createFile()')
    }

    const newFile: IFile = {
      name: File.name,
      type: File.type,
      content: File.content,
      status: ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    if (File.parentId) {
      const parent = await getFolder(File.parentId)
      if (parent) {
        newFile.parentId = File.parentId
      } else {
        throw new Error('Parent file does not exist')
      }
    } else {
      newFile.parentId = 1 // Always create file in Desktop
    }

    return await db.files.add(newFile)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const createFolder = async (File: IFile) => {
  try {
    if (File.type !== 'folder') {
      throw new Error('Cannot create file using createFolder()')
    }

    const newFile: IFile = {
      name: File.name,
      type: File.type,
      status: ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    if (File.parentId) {
      const parent = await getFolder(File.parentId)
      if (parent) {
        newFile.parentId = File.parentId
      } else {
        throw new Error('Parent file does not exist')
      }
    } else {
      newFile.parentId = 1 // Always create folder in Desktop
    }

    return await db.files.add(newFile)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const removeFile = async (id: number) => {
  try {
    const file = await getFile(id)
    if (!file) {
      throw new Error('File does not exist')
    }

    return await db.files.put({ id, status: DELETED })

  } catch (error: any) {
    throw new Error(error)
  }
}

export const removeFolder = async (id: number) => {
  try {
    const folder = await getFolder(id)
    if (!folder) {
      throw new Error('Folder does not exist')
    }

    // TODO: Implement recursive delete
    return await db.files.put({ id, status: DELETED })

  } catch (error: any) {
    throw new Error(error)
  }
}

export const isOpen = () => db.isOpen()