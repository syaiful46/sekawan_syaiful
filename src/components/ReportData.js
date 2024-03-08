import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '.';

const ReportData = ({label, value}) => {
  return (
    <View style={{justifyContent: 'space-between', gap: 5}}>
      <Text>{label}:</Text>
      <View style={[styles.input]}>
        <Text
          style={[
            {
              marginBottom: 0,
              color: '#000',
              fontSize: 12,
              fontWeight: '700',
            },
          ]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  invalidInput: {
    borderColor: 'red',
  },
});

export default ReportData;
