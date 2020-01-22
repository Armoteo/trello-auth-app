//сохраняем токен в локал стор
export const setToLocaStorage = async (key: string, data: any) => {
    window.localStorage.setItem(key, data);
};
//извлекаем токен в локал стор
export const getFromLocalStorage =  (key: string) => {
    return JSON.parse(window.localStorage.getItem(key) || '{}');
};



// export const setToLocalStorage = <P>(key: string, data: P) => {
//     window.localStorage.setItem(key, JSON.stringify(data));
// };
//
// export const getFromLocalStorage = <T>(key: string): T => {
//     return JSON.parse(window.localStorage.getItem(key) || '{}');
// };
