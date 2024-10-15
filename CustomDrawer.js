import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useTheme } from './ThemeContext';

const CustomDrawer = (props) => {
  const { isDarkMode, toggleTheme } = useTheme(); // Access theme context

  return (
    <View style={[styles.drawerContainer, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        {/* Dark Mode Toggle */}
        <View style={styles.toggleContainer}>
          <Text style={[styles.toggleText, isDarkMode ? styles.darkText : styles.lightText]}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  toggleText: {
    fontSize: 16,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default CustomDrawer;

