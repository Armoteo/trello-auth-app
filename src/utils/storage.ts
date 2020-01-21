//сохраняем токен в локал стор
export const setToLocaStorage = async (key: string, data: any) => {
    window.localStorage.setItem(key, data);
};
//извлекаем токен в локал стор
export const getFromLocalStorage =  (key: string) => {
   return window.localStorage.getItem(key);
};