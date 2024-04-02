import {createAction, props} from '@ngrx/store';

export const setUser = createAction('[User] set user', props<{data: Object}>());
export const setUserPermissions = createAction('[User] set user permissions', props<{data: Object}>());
export const clearUser = createAction('[User session] clear user session');
