import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import BookDonateScreen from '../screens/BookDonateScreen';
import BookRequestScreen from '../screens/BookRequestScreen';

export const AppTabNavigator=createBottomTabNavigator({
    Donate:{
        screen:BookDonateScreen,
        navigationOptions:{
            tabBarIcon:<Image source={require('../assets/request-list.png')} style={{width:20,height:20}}/>,
            tabBarlabel: 'Donate Books'
        }
    },
    BookRequest:{
        screen:BookRequestScreen,
        navigationOptions:{
            tabBarIcon:<Image source={require('../assets/request-book.png')} style={{width:20,height:20}}/>,
            tabBarlabel: 'Book Request'
        }
    },

})