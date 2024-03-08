import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';

const tokenKey = '@tokenKey';

export const useSession = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem(tokenKey);
      setToken(value);
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  const saveToken = async value => {
    try {
      await AsyncStorage.setItem(tokenKey, value);
      setToken(value);
      console.log('Saved token:', value);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(tokenKey);
      setToken(null);
      console.log('Logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return {
    token,
    getToken,
    saveToken,
    logout,
  };
};
