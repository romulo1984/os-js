import { db } from './index'
import { FILE_STATUS } from '@/utils/constants'

const { ACTIVE } = FILE_STATUS

export const populate = async () => {
  console.log('Populating database...')

  await populateFiles()
  await populateDock()
  
  console.log('Database populated!')
}

const populateFiles = async () => db.files.bulkAdd([
  {
    name: 'Desktop',
    type: 'folder',
    status: ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Folder sample',
    type: 'folder',
    status: ACTIVE,
    parentId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Text Sample',
    type: 'text/plain',
    status: ACTIVE,
    parentId: 1,
    content: 'This is a sample text file.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'File inside a folder',
    type: 'application/pdf',
    status: ACTIVE,
    parentId: 2,
    content: 'This is a sample PDF file.',
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

const populateDock = async () => db.dock.bulkAdd([
  { name: 'Terminal', program: 'terminal' },
])