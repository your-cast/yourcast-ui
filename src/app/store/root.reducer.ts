import * as fromAppReducer from './app/reducers/app.reducer';
import * as fromUserReducer from './user/reducers/user.reducer';

export const ROOT_REDUCER = {
  app: fromAppReducer.reducer,
  user: fromUserReducer.reducer,
};

