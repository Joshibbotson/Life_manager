import { createReducer, on } from '@ngrx/store'
import { IChore, IChoreReadRequest } from '../../../../../api/dist/chores/index'
import {
  loadChoresSuccess,
  createChoreSuccess,
  deleteChoreSuccess,
  loadChoresFailure,
  loadChoreByIdSuccess,
  loadChoreByIdFailure,
  reloadChores,
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

  on(createChoreSuccess, (state, { chore }) => {
    console.log(chore)
    return {
      ...state,
      chores: {
        ...state.chores,
        data: [...state.chores.data, chore],
      },
    }
  }),

  // maybe this does not return the correct state?
  on(deleteChoreSuccess, (state, { chore }) => {
    const choreIndex = state.chores.data.findIndex(
      (oldChore) => oldChore.id === chore.id,
    )

    if (choreIndex !== -1) {
      const stateCopy = [...state.chores.data]
      return {
        ...state,
        chores: {
          ...state.chores,
          data: stateCopy.filter((oldChore) => oldChore.id !== chore.id),
        },
      }
    }
    return state
  }),

  on(reloadChores, (state) => {
    return { ...state }
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
