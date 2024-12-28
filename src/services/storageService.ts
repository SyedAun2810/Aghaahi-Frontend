export const getItem = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    throw Error();
  } catch (e) {
    return null;
  }
};

export const setItem = (
  key: string,
  value: string | number | boolean | object | any
) => {
  const storeValue = JSON.stringify(value);
  return localStorage.setItem(key, storeValue);
};

export const removeItem = (key: string) => localStorage.removeItem(key);

export const clearAllData = () => localStorage.clear();
