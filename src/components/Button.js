import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  View,
  StyleSheet,
} from 'react-native';

const Button = ({style, styleView, tidakputih, title, onPress, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={
        styleView
          ? {
              borderRadius: 10,
              paddingBottom: 3,
              backgroundColor: tidakputih ? '#F6F0EB' : '#91BF8B',
            }
          : {
              borderRadius: 16,
              paddingBottom: 5,
              backgroundColor: tidakputih ? '#F6F0EB' : '#91BF8B',
            }
      }>
      <View
        style={
          styleView
            ? styles.buttonView
            : tidakputih
            ? [styles.buttonTdkputih, style]
            : [styles.button, style]
        }>
        <Text
          style={
            styleView
              ? {color: '#FFFF', fontSize: 12, fontWeight: '700'}
              : tidakputih
              ? styles.buttonText
              : styles.buttonTextPutih
          }>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#A3CF9E',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    backgroundColor: '#A3CF9E',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTdkputih: {
    backgroundColor: '#FFFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextPutih: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#564E49',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Button;
