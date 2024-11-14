import {createAction, props} from '@ngrx/store';

export const setUser = createAction('[User] set user', props<{data: Object}>());
export const clearUser = createAction('[User session] clear user session');
