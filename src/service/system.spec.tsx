import { getFile, createFile, removeFile } from './system'

describe('System', () => {
  test('Should create and get files', async () => {
    const createdAt = new Date()
    const updatedAt = new Date()
    const file = {
      name: 'test',
      type: 'plain/text',
      content: 'test',
      createdAt,
      updatedAt,
    }

    await createFile(file)

    expect(getFile(1)).resolves.toEqual({ id: 1, ...file })
  })

  test('should remove file', async () => {
    expect(removeFile(1)).resolves.toBeUndefined()
  })
})
