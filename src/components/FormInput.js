import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Text} from '.';

const FormInput = ({
  label,
  onChangeText,
  valueText,
  placeholder,
  keyboardType = 'name-phone-pad',
  maxLength,
  invalidEmail,
  required = true,
}) => {
  return (
    <View style={{justifyContent: 'space-between', gap: 5}}>
      <Text>
        {label}
      </Text>
      <View
        style={[
          styles.input,
          invalidEmail && styles.invalidInput,
          required && styles.invalidInput,
        ]}>
        <TextInput
          maxLength={maxLength}
          style={[
            {marginBottom: 0, color: '#000', fontSize: 12, fontWeight: '500'},
          ]}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          value={valueText}
          placeholder={placeholder}
          placeholderTextColor="rgba(95, 100, 94, 0.5)"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'flex-start',
    paddingHorizontal: 3,
  },
  invalidInput: {
    borderColor: 'red',
  },
});

export default FormInput;
