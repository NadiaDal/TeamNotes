import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFromStorage = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('store');
  } catch (error) {
    // TODO add logger
    console.error(error);
  }
  return null;
};

export const saveToStorage = async (store: string) => {
  try {
    await AsyncStorage.setItem('store', store);
  } catch (error) {
    // TODO add logger
    console.error(error);
  }
};
