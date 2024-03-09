import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from '.';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProductItems = ({data, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <Image
          resizeMode="contain"
          source={{uri: data.image}}
          style={styles.img}
        />
      </View>
      <View style={styles.title}>
        <Text numberOfLines={2} style={{bottom: 0}}>
          {data.title}...
        </Text>
      </View>
      <View style={styles.detail}>
        <Text>${data.price}</Text>
        <Icon.Button
          onPress={onPress}
          backgroundColor={'steelblue'}
          name="info-circle"
          size={16}
          color={'white'}>
          Detail
        </Icon.Button>
      </View>
    </View>
  );
};

export default ProductItems;

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'lightgray',
    padding: 10,
    gap: 10,
    borderWidth: 1,
  },
  img: {
    height: 80,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    height: 60,
    width: '95%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  detail: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 5,
  },
});
