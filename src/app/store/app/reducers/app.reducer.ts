import {apiRequestFinished, apiRequestSent} from '../actions/app.actions';
import {tassign} from 'tassign';
import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {AppState} from '../../store';

export const key = 'app';

export interface State {
  apiActiveRequestCount: number;
}

export const initialState: State = {
  apiActiveRequestCount: 0,
};

export const appReducer = createReducer(
  initialState,
  on(apiRequestSent, state => (tassign(state, {apiActiveRequestCount: state.apiActiveRequestCount + 1}))),
  on(apiRequestFinished, state => (tassign(state, {apiActiveRequestCount: state.apiActiveRequestCount - 1}))),
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}

export const selectAppState = (state: AppState) => state[key];

export const getApiReqCount = createSelector(
  selectAppState,
  (state: State) => state.apiActiveRequestCount
);
