import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, Image, Keyboard, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen, DashboardHome} from '../pages';

const Stack = createStackNavigator();

import {Text} from '../components';

const Router = () => {
  // untuk animasi slide kanan
  const slideFromRight = ({current, next, inverted, layouts: {screen}}) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [screen.width, 0],
            extrapolate: 'clamp',
          }),
        },
        {
          translateX: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -screen.width],
                extrapolate: 'clamp',
              })
            : 0,
        },
      ],
    },
    transitionSpec: {
      open: {animation: 'timing', config: {duration: 1500}}, // Sesuaikan durasi animasi di sini
      close: {animation: 'timing', config: {duration: 1500}}, // Sesuaikan durasi animasi di sini
    },
  });

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: slideFromRight,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="DashboardHome" component={DashboardHome} />
    </Stack.Navigator>
  );
};

export default Router;
