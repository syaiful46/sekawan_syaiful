import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, StatusBar, Alert} from 'react-native';
import {Text} from '../../components';
import {useSession} from '../../global/utils/Session';
import {useAsyncStorage} from '../../global/utils/storage';
import {ApiService, baseUrl} from '../../services/ApiService';

const SplashScreen = ({navigation}) => {
  const {token, getToken, saveToken} = useSession();
  const {setItem, getItem, removeItem} = useAsyncStorage();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('DashboardHome');
    }, 3500);

    return () => clearTimeout(timer);
  }, [token]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <Text
        style={{marginTop: 15, fontWeight: 'bold', color: 'white'}}
        size={21.126}>
        Sekawan Media
      </Text>
      <Text style={{fontWeight: '900', color: 'white'}}>@Syaiful_Ramadhan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue',
  },
  image: {
    width: 104,
    height: 104,
  },
});

export default SplashScreen;
