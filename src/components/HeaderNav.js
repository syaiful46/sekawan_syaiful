import React, {useContext} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Text from './Text';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HeaderNav = ({onPress, title}) => {
  return (
    <View style={styles.header}>
      <View style={{flex: 0.5}}>
        <View style={styles.row}>
          <TouchableWithoutFeedback onPress={onPress}>
            <Icon name='arrow-circle-left' size={30} color={'lightgreen'} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={{flex: 2, alignItems: 'center'}}>
        <View style={[styles.row]}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 18,
              textAlign: 'center',
              color: 'black',
            }}>
            {title}
          </Text>
        </View>
      </View>
      <View style={{flex: 0.5}}>
        <View style={styles.row} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HeaderNav;
