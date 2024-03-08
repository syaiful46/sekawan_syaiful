import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '.';
import {Dropdown} from 'react-native-element-dropdown';

const DropdownInput = ({
  label,
  placeholder,
  data,
  value,
  onChange,
  search,
  required = true,
}) => {
  return (
    <View style={{justifyContent: 'space-between', gap: 5}}>
      <Text>{label}</Text>
      <Dropdown
        style={[styles.containerDropdown, required && {borderColor: 'red'}]}
        placeholderStyle={styles.placeholderDropdown}
        selectedTextStyle={styles.selectedTextDropdown}
        itemTextStyle={styles.itemDropdown}
        iconStyle={styles.iconDropdown}
        data={data}
        search={search}
        maxHeight={150}
        inputSearchStyle={styles.inputSearchStyle}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={onChange}
      />
    </View>
  );
};

export default DropdownInput;

const styles = StyleSheet.create({
  containerDropdown: {
    backgroundColor: 'transparent',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 3,
    height: 40,
    zIndex: 1,
  },
  placeholderDropdown: {
    color: 'rgba(95, 100, 94, 0.5)',
    fontWeight: '500',
    fontSize: 12,
  },
  itemDropdown: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Nunito-Medium',
  },
  selectedTextDropdown: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  iconDropdown: {
    right: 5,
    width: 28,
    height: 28,
    tintColor: 'rgba(95, 100, 94, 0.8)',
  },
  inputSearchStyle: {
    height: 40,
    color: 'rgba(95, 100, 94, 1)',
    fontSize: 12,
  },
});
