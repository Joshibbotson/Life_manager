import {
  IMetaProperties,
  IMetaQueryParams,
  IMetaReadOneResponse,
  IMetaReadReponse,
  IMetaReadRequest,
} from '../common/types'


export interface IDirectory extends IMetaProperties {
  name: string
}

export interface IReadDirectory extends IDirectory {
  parentDirectory: IReadDirectory | null
  childDirectory: IReadDirectory[] 
}

export interface IDirectoryCreateRequest extends IDirectory {
  parentDirectory: number | null
  childDirectory: number[]
}
export interface IDirectoryCreateResponse extends IReadDirectory {}

export interface IFilter {}
export interface ISort {}

export interface IDirectoryReadRequest extends IMetaReadRequest<IFilter, ISort> {}
export interface IDirectoryReadResponse extends IMetaReadReponse<IReadDirectory> {}
export interface IDirectoryReadOneByIdResponse
  extends IMetaReadOneResponse<IReadDirectory> {}

export interface IDirectoryUpdateRequest extends Partial<IReadDirectory> {
  id: number;
  version: number
}
export interface IDirectoryUpdateResponse extends IReadDirectory {}

export interface IDirectoryDeleteRequest {
  id: number
}
export interface IDirectoryDeleteResponse extends IReadDirectory {}

export interface IDirectoryQueryOptions extends IMetaQueryParams<IFilter, ISort> {
  id: number
}
