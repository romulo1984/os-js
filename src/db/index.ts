import Dexie, { Table } from 'dexie'
import { IFile, IDock } from './types'
import { populate } from './populate'

export class Database extends Dexie {
  files!: Table<IFile>
  dock!: Table<IDock>

  constructor() {
    super('system')
    this.version(1).stores({
      files: '++id, name, type, status, parentId, content, createdAt, updatedAt',
      dock: '++id, name, program'
    })
    this.files = this.table('files')
    this.dock = this.table('dock')
  }
}

export const db = new Database()

db.on('populate', populate)

export const resetDatabase = async () => {
  return db.transaction('rw', db.files, db.dock, async () => {
    await Promise.all(db.tables.map(table => table.clear()))
    await populate()
  })
}