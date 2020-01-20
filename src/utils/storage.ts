export const setToLocaStorage = async (key: string, data: any) => {
    window.localStorage.set(key, data);
}

export const getFromStorage = async (key: string) => {
    window.localStorage.getItem(key);
}