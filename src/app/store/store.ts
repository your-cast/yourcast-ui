import * as appReducer from './app/reducers/app.reducer';
import * as userReducer from './user/reducers/user.reducer';

export interface AppState {
  [appReducer.key]: appReducer.State;
  [userReducer.key]: userReducer.State;
}






