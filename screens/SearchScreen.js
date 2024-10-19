import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchScreen = ({ onSearch, onSearchCategory, onEditorsChoice, isDarkMode, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery); // Perform the search
      setSearchQuery('');    // Clear the input field
      navigation.navigate('Home'); // Redirect to HomeScreen
    }
  };

  const handleCategorySearch = (category) => {
    onSearchCategory(category); // Perform category-based search
    navigation.navigate('Home'); // Redirect to HomeScreen
  };

  const handleEditorsChoice = () => {
    onEditorsChoice(); // Perform Editor's Choice search
    navigation.navigate('Home'); // Redirect to HomeScreen
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}>
      {/* Search Field */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { color: isDarkMode ? '#fff' : '#000', borderBottomColor: isDarkMode ? '#fff' : '#000' }]}
          placeholder="Search wallpapers..."
          placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} // Trigger search on pressing Enter
          returnKeyType="search"
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Categories</Text>
        <View style={styles.categoriesList}>
          <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategorySearch('Nature')}>
            <Text style={styles.categoryText}>Nature</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategorySearch('Space')}>
            <Text style={styles.categoryText}>Space</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategorySearch('Animals')}>
            <Text style={styles.categoryText}>Animals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategorySearch('Technology')}>
            <Text style={styles.categoryText}>Technology</Text>
          </TouchableOpacity>
          {/* Add more categories as needed */}
        </View>
      </View>

      {/* Editor's Choice */}
      <View style={styles.editorsChoiceContainer}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Editor's Choice</Text>
        <TouchableOpacity style={styles.editorsChoiceButton} onPress={handleEditorsChoice}>
          <Text style={styles.editorsChoiceText}>Explore Editor's Choice</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 5,
    fontSize: 18,
  },
  searchButton: {
    marginLeft: 10,
  },
  categoriesContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryItem: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
  },
  editorsChoiceContainer: {
    marginBottom: 20,
  },
  editorsChoiceButton: {
    padding: 15,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  editorsChoiceText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default SearchScreen;
