import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundleReducer from './bundleReducer';
import modalReducer from './modalReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundleReducer,
  modal: modalReducer,
});

export default reducers;

// overall structure
export type RootState = ReturnType<typeof reducers>;
