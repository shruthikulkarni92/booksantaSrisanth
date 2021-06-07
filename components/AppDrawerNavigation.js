import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import {createDrawerNavigator} from 'react-navigation-drawer';

export const AppDrawerNavigator=createDrawerNavigator({
  Home:{
    screen:AppTabNavigator
  },
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName:'Home'
})