import { AppState } from '..';

export const getBoards = (appState: AppState): Array<any> =>
  appState.listBoard.list;
