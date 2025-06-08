import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import vacancyReducer from './vacancyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  vacancy: vacancyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
