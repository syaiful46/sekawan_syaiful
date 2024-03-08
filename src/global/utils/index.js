import {useEffect} from 'react';
import {ToastAndroid, Platform, Alert} from 'react-native';

export function handleMessageError(message) {
  useEffect(() => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.LONG);
    } else {
      Alert.alert('Message', message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }, [message]);
}
