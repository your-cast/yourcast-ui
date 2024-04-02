import {tassign} from 'tassign';
import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {AppState} from '../../store';
import {clearUser, setUser, setUserPermissions} from '../actions/user.actions';

export const key = 'user';

export interface State {
  user: any;
  permissions: any;
}

export const initialState: State = {
  user: null,
  permissions: null
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, {data}) => (tassign(state, {user: data}))),
  on(setUserPermissions, (state, {data}) => tassign(state, {permissions: data})),
  on(clearUser, state => tassign(state, {user: null, permissions: null}))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

export const selectUserState = (state: AppState) => state[key];

export const getUser = createSelector(
  selectUserState,
  (state: State) => state.user
);

export const getUserPermissions = createSelector(
  selectUserState,
  (state: State) => state.permissions
);

