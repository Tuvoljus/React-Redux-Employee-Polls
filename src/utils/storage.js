export const setSessionStorageItem = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting item in sessionStorage:', error);
  }
};

export const getSessionStorageItem = (key) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error retrieving item from session storage: ${error}`);
    return null;
  }
};
