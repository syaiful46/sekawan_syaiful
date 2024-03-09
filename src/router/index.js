import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, Image, Keyboard, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SplashScreen,
  DashboardHome,
  DetailProduct,
  MyProfile,
  CertificateDetail,
} from '../pages';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import {Text} from '../components';

const TabArr = [
  {
    route: 'DashboardHome',
    label: 'Product',
    activeColor: 'steelblue',
    inActiveColor: 'lightblue',
    component: DashboardHome,
  },
  {
    route: 'MyProfile',
    label: 'Profile',
    activeColor: 'steelblue',
    inActiveColor: 'lightblue',
    component: MyProfile,
  },
];

const MainDashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 5,
          height: 60,
          borderColor: 'lightgray',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: 'steelblue',
        tabBarInactiveTintColor: 'lightblue',
        tabBarHideOnKeyboard: true,
      }}
      tabBarPosition="bottom">
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              headerShown: false,
              tabBarShowLabel: true,
              tabBarLabel: item.label,
              tabBarLabelStyle: {fontSize: 16},
              tabBarLabelPosition: 'beside-icon',
              tabBarIcon: ({color, size}) => {
                if (item.label === 'Product') {
                  return <Icon name="table" color={color} size={size} />;
                } else {
                  return (
                    <Icon name="user-astronaut" color={color} size={size} />
                  );
                }
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

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
      <Stack.Screen name="MainDashboard" component={MainDashboard} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="DetailProduct" component={DetailProduct} />
      <Stack.Screen name="CertificateDetail" component={CertificateDetail} />
    </Stack.Navigator>
  );
};

export default Router;
