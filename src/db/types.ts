export interface IFile {
  id?: number,
  name?: string,
  type?: string,
  status?: string,
  parentId?: number,
  content?: string,
  createdAt?: Date,
  updatedAt?: Date,
  children?: IFile[]
}

export interface IDock {
  id?: number,
  name: string,
  program: string
}


// '++id, name, type, parentId, content, createdAt, updatedAt'