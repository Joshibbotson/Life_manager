import { createReducer, on } from "@ngrx/store";
import {IChore} from '../../../../../api/dist/chores/index'
import * as ChoresActions from '../actions/chores.actions'

export interface ChoresState {
  chores: IChore[]
}

const initialState: ChoresState = {
  chores:[],
}

export const choresReducer = createReducer(
  initialState,
  on(ChoresActions.loadChoresSuccess, (state, { chores }) => ({ ...state, chores})),
  on(ChoresActions.createChoreSuccess, (state, { chore }) => ({ ...state, chores: [...state.chores, chore] })),
  on(ChoresActions.deleteChoreSuccess, (state, { id }) => {
    const choreIndex = state.chores.findIndex((chore) => chore.id === id)

    if(choreIndex !== -1){
      const stateCopy = [...state.chores]
      return  { ...state, chores: stateCopy.filter((chore) => chore.id !== id)}
    }
    return state
  })
)