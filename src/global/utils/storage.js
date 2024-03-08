import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage() {
  const setItem = async (name, value) => {
    try {
      const data = typeof value === 'object' ? JSON.stringify(value) : value;
      await AsyncStorage.setItem(name, data);
      console.log('Data berhasil disimpan:', name, data);
    } catch (error) {
      throw new Error('Item Not set');
    }
  };

  const getItem = async name => {
    try {
      const data = await AsyncStorage.getItem(name);
      if (typeof data === 'object') {
        return JSON.parse(data);
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  const removeItem = async name => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      throw new Error('delete storage failed');
    }
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
}
