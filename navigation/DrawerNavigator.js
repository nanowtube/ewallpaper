// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerLabelStyle: { fontSize: 16 },
          drawerActiveTintColor: '#007bff',
          drawerInactiveTintColor: '#000',
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color }) => <Icon name="home" size={20} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Bookmarks"
          component={BookmarkScreen}
          options={{
            drawerIcon: ({ color }) => <Icon name="bookmark" size={20} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
