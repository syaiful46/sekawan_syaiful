import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from '.';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HeaderProfile = ({name, job, location, desc}) => {
  return (
    <View>
      <View style={styles.header} />
      <View style={styles.secondHeader} />
      <View style={styles.contentHeader}>
        <Image
          style={{
            width: 110,
            height: 110,
            backgroundColor: 'gray',
            borderRadius: 200,
            borderColor: '#ffff',
            borderWidth: 3,
            elevation: 3,
          }}
          resizeMode="contain"
          source={require('../assets/image/syaiful46.png')}
        />
        <View
          style={{
            height: 110,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Text color={'white'} style={{top: 10}} size={20} fontWeight={'bold'}>
            {name}
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              bottom: 2,
            }}>
            <Text size={20} fontWeight={'bold'}>
              {job}
            </Text>
            <Text size={15} fontWeight={'bold'} color={'steelblue'}>
              {location}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.secondContentHeader}>
        <View
          style={{
            width: '10%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Icon name={'comments'} size={20} color={'steelblue'} />
        </View>
        <View
          style={{
            width: '85%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text color={'steelblue'}>{desc}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: 'steelblue',
    height: 150,
    elevation: 3,
    width: '100%',
  },
  secondHeader: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 24,
    height: 150,
  },
  contentHeader: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 24,
    height: 150,
    top: 75,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    gap: 40,
  },
  secondContentHeader: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 24,
    height: 75,
    top: 225,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
});

export default HeaderProfile;
