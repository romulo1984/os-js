export interface IFile {
  id?: number,
  name: string,
  type: string,
  parentId?: number,
  content: string,
  createdAt?: Date,
  updatedAt?: Date,
  children?: IFile[]
}

// '++id, name, type, parentId, content, createdAt, updatedAt'