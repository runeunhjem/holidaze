// Save data to localStorage
export const save = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Could not save to localStorage", error);
  }
};

// Load data from localStorage
export const load = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : null;
  } catch (error) {
    console.error("Could not load from localStorage", error);
    return null;
  }
};
