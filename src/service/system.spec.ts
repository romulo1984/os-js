import { getFile, createFile, removeFile, useFiles } from './system'
import { mockFiles } from './mocks'

vi.mock('dexie-react-hooks', () => ({
  useLiveQuery: vi.fn(async () => mockFiles)
}))

describe('System', () => {
  test('Should create and get files', async () => {
    const file = {
      name: 'test',
      type: 'plain/text',
      content: 'test'
    }

    await createFile(file)

    expect(getFile(1)).resolves.toMatchObject({ id: 1, ...file })
  })

  test('should throw error when file not found', async () => {
    expect(getFile(2)).resolves.toBeUndefined()
  })

  test('should remove file', async () => {
    expect(removeFile(1)).resolves.toBeUndefined()
  })

  test('should create file with parent', async () => {
    const file1 = {
      name: 'parent file',
      type: 'plain/text',
      content: 'test'
    }

    const file2 = {
      ...file1,
      parentId: 2,
    }

    await createFile(file1)
    await createFile(file2)

    expect(getFile(3)).resolves.toMatchObject({ id: 3, ...file2 })
  })

  test('should return all files', async () => {
    expect(useFiles()).resolves.toMatchObject(mockFiles)
  })
})
