import { ADD_COMMAND, CLEAR_CONSOLE, SET_COLOR } from './actions';

const initialState = {
  history: [
    {
      input: '',
      output: `Welcome to the custom React Console! 
Type 'help' to see available commands.`
    }
  ],
  color: '#ffffff' // Default color (green)
};

export const consoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMAND:
      return {
        ...state,
        history: [...state.history, { input: action.payload.input, output: action.payload.output }]
      };
    case CLEAR_CONSOLE:
      return {
        ...state,
        history: []
      };
    case SET_COLOR:
      return {
        ...state,
        color: action.payload
      };
    default:
      return state;
  }
};


export default consoleReducer;
