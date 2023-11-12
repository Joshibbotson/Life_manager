import { IMetaProperties, IMetaReadRequest } from "../common/types.module";

export interface IChore extends IMetaProperties  {
    name: string,
    description: string,
    createdBy: string,
    assignedTo: string,
    completed: string,
}


export interface IChoreReadRequest extends IMetaReadRequest<IChore> {}
