//save our tokken in localstorage
export const setToLocalStorage = async (key: string, data: any) => {
  window.localStorage.setItem(key, data);
};
//getting our tokken with localstorage
export const getFromLocalStorage = async (key: string) => {
  window.localStorage.getItem(key);
};
