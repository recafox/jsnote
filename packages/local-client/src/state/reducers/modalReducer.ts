import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const reducer = produce((state: ModalState, action: Action) => {
  switch (action.type) {
    case ActionType.TOGGLE_MODAL:
      state.isOpen = action.payload;
      return state;
    default:
      return state;
  }
}, initialState);

export default reducer;
