import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // To navigate to SearchScreen

const HomeTopBar = ({ isDarkMode }) => {
  const navigation = useNavigation(); // Access navigation to change screens

  const openSearchWindow = () => {
    // Navigate to the SearchScreen when the search icon is pressed
    navigation.navigate('Search');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}>
      <TouchableOpacity onPress={openSearchWindow}>
        <Icon name="search" size={24} color={isDarkMode ? '#fff' : '#000'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40, // Adjust height if necessary
  },
});

export default HomeTopBar;

