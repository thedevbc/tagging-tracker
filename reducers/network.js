import Actions from '../actions';
import _ from 'lodash';

const initialState = {
  isConnected: false,
  queue: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Actions.CONNECTION_STATE:
      return {
        ...state,
        isConnected: action.isConnected,
      };
    default:
      return state;
  }
}