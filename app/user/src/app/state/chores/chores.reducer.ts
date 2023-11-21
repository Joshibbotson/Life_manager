import { createReducer, on } from '@ngrx/store'
import { IChore, IChoreReadRequest } from '../../../../../api/dist/chores/index'
import {
  loadChoresSuccess,
  createChoreSuccess,
  deleteChoreSuccess,
  loadChoresFailure,
  loadChoreByIdSuccess,
  loadChoreByIdFailure,
} from './chores.actions'

export interface ChoresState {
  chores: IChoreReadRequest
  error: string | null
  status: string
}

const initialState: ChoresState = {
  chores: { skip: 0, take: 10, count: 0, data: [] },
  error: null,
  status: 'pending',
}

export interface ChoreState {
  selectedChore: IChore | null
  error: string | null
  status: string
}

const initialChoreState: ChoreState = {
  selectedChore: null,
  error: null,
  status: 'pending',
}

export const choresReducer = createReducer(
  initialState,
  on(loadChoresSuccess, (state, { chores }) => ({
    chores: chores,
    error: null,
    status: 'success',
  })),
  on(loadChoresFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  on(createChoreSuccess, (state, { chore }) => ({
    ...state,
    data: [...state.chores.data, chore],
  })),

  on(deleteChoreSuccess, (state, { id }) => {
    const choreIndex = state.chores.data.findIndex((chore) => chore.id === id)

    if (choreIndex !== -1) {
      const stateCopy = [...state.chores.data]
      return { ...state, data: stateCopy.filter((chore) => chore.id !== id) }
    }

    return state
  }),
)

export const choreReducer = createReducer(
  initialChoreState,
  on(loadChoreByIdSuccess, (state, { chore }) => ({
    selectedChore: chore,
    error: null,
    status: 'success',
  })),
  on(loadChoreByIdFailure, (state, { error }) => ({
    selectedChore: null,
    error,
    status: 'error',
  })),
)
