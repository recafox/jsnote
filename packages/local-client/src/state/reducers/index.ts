import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundleReducer from './bundleReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundleReducer,
});

export default reducers;

// overall structure
export type RootState = ReturnType<typeof reducers>;
