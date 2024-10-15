import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeTopBar = ({ onSearch, isDarkMode }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchQuery(''); // Clear the search query if toggled off
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}>
      {searchVisible ? (
        <TextInput
          style={[
            styles.searchInput, 
            { 
              borderBottomColor: isDarkMode ? '#fff' : '#000',
              color: isDarkMode ? '#fff' : '#000' // Set text color based on dark mode
            }
          ]}
          placeholder="Search"
          placeholderTextColor={isDarkMode ? '#ccc' : '#aaa'} // Adjust placeholder color for dark mode
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => {
            onSearch(searchQuery); // Call the onSearch function with the current query
            setSearchQuery(''); // Clear the input after search
          }}
          returnKeyType="search" // This adds the "Search" button on the keyboard
          autoFocus // Automatically focus on the search input when it expands
        />
      ) : (
        <TouchableOpacity onPress={toggleSearch}>
          <Icon name="search" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
      )}
      {searchVisible && (
        <TouchableOpacity onPress={toggleSearch}>
          <Icon name="times" size={24} color={isDarkMode ? '#fff' : '#000'} style={styles.closeIcon} />
        </TouchableOpacity>
      )}
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
  searchInput: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 16,
    borderBottomWidth: 1, // Only underline with no background
  },
  closeIcon: {
    paddingLeft: 10,
  },
});

export default HomeTopBar;
