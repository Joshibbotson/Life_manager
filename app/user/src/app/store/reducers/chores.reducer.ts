import { createReducer, on } from "@ngrx/store";
import {IChore, IChoreReadRequest} from '../../../../../api/dist/chores/index'
import * as ChoresActions from '../actions/chores.actions'

export interface ChoresState {
  chores: IChoreReadRequest
}

const initialState: ChoresState = {
  chores:{ page: 1, take: 10, count: 0,  data: []}
}

export const choresReducer = createReducer(
  initialState,
  on(ChoresActions.loadChoresSuccess, (state, { chores }) => ({chores: chores})),
  on(ChoresActions.createChoreSuccess, (state, { chore }) => ({ ...state, data:[...state.chores.data, chore] })),
  on(ChoresActions.deleteChoreSuccess, (state, { id }) => {
    const choreIndex = state.chores.data.findIndex((chore) => chore.id === id)

    if(choreIndex !== -1){
      const stateCopy = [...state.chores.data]
      return  { ...state, data: stateCopy.filter((chore) => chore.id !== id)}
    }

    return state
  })
)

