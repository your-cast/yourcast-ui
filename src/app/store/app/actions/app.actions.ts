import {createAction} from '@ngrx/store';

// api request count
export const apiRequestSent = createAction('[Api] Request Sent');
export const apiRequestFinished = createAction('[Api] Request finished');
export const apiRequestError = createAction('[Api] Request error');

