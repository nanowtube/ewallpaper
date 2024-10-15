import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../ThemeContext';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BookmarksScreen = ({ bookmarkedWallpapers, toggleBookmark, navigation }) => {
  const { isDarkMode } = useTheme();

  // Function to show wallpaper details in an alert
  const showDetails = (item) => {
    Alert.alert(
      'Wallpaper Info',
      `Photographer: ${item.user}\nTags: ${item.tags}\nProvided by Pixabay`,
      [{ text: 'LINK', onPress: () => Linking.openURL(item.largeImageURL) },
      { text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.largeImageURL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.user}</Text>
        <View style={styles.iconContainer}>
          {/* Info Icon */}
          <TouchableOpacity onPress={() => showDetails(item)} style={styles.iconButton}>
            <Icon name="info-circle" size={24} color="#fff" />
          </TouchableOpacity>
          {/* Download Icon */}
          <TouchableOpacity onPress={() => downloadImage(item.largeImageURL)} style={styles.iconButton}>
            <Icon name="download" size={24} color="#fff" />
          </TouchableOpacity>
          {/* Bookmark Icon */}
          <TouchableOpacity onPress={() => toggleBookmark(item)} style={styles.iconButton}>
            <Icon name={bookmarkedWallpapers.some(wallpaper => wallpaper.id === item.id) ? 'bookmark' : 'bookmark-o'} size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (!bookmarkedWallpapers || bookmarkedWallpapers.length === 0) {
    return (
      <View style={[styles.emptyContainer,{backgroundColor: isDarkMode ? '#121212' : '#fff'}]}>
        <Text style={[styles.emptyText, {color: isDarkMode ? 'white': 'black'}]}>No bookmarks available.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f2f2f2' }]}>
      <FlatList
        data={bookmarkedWallpapers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={windowWidth}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 0 }}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.86,
    marginTop: 10,
    marginLeft: windowWidth * 0.025,
    marginRight: windowWidth * 0.025,
    borderRadius: 10,
    backgroundColor: '#444', // Adjust according to your theme
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: windowHeight * 0.8,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'black',
  },
});

export default BookmarksScreen;


