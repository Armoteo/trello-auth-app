import { AppState } from '..';

export const getBoards = (appState: AppState): Array<any> =>
  appState.listCard.list;

export const getListBoards = (appState: AppState): Array<any> =>
  appState.listBoard.list;
