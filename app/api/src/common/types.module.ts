export interface IMetaProperties {
  id: number,
  deleted: boolean,
  createdDate: Date, // change this to DateTime
  editedDate: Date, // change this to DateTime
}

export interface IMetaReadRequest<T> {
  page: number,
  take: number,
  count: number,
  data: T[],
}