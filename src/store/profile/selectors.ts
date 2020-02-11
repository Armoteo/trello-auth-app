import { AppState } from '..';

// export const getBoards = (appState: AppState): Array<any> =>
export const getBoards = (appState: AppState): any =>
  appState.profile.list;
