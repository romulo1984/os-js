import Dexie, { Table } from 'dexie'
import { IFile } from './types'

export class Database extends Dexie {
  files: Table<IFile>

  constructor() {
    super('system')
    this.version(1).stores({
      files: '++id, name, type, parentId, content, createdAt, updatedAt'
    })
    this.files = this.table('files')
  }
}

export const db = new Database()