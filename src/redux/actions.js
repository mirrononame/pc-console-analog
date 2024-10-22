export const ADD_COMMAND = 'ADD_COMMAND';
export const CLEAR_CONSOLE = 'CLEAR_CONSOLE';
export const SET_COLOR = 'SET_COLOR';

export const addCommand = (input, output) => ({
  type: ADD_COMMAND,
  payload: { input, output }
});

export const clearConsole = () => ({
  type: CLEAR_CONSOLE
});

export const setColor = (color) => ({
  type: SET_COLOR,
  payload: color
});
