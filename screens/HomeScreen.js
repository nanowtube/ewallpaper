import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useTheme } from '../ThemeContext';
import { Linking } from 'react-native';

const API_KEY = '21084477-4d79e8a5553ca1ef3f1eed523'; // Replace with your Pixabay API key
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation, setBookmarkedWallpapers, bookmarkedWallpapers, searchQuery }) => {
  const { isDarkMode } = useTheme();
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch wallpapers based on query
  const fetchWallpapers = async (query) => {
    if (!query) return; // Return if the query is empty

    try {
      setLoading(true);
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: API_KEY,
          q: query,
          image_type: 'photo',
          orientation: 'vertical',
          min_height: '1920',
          min_width: 1080,
          per_page: 30,
        },
      });
      setWallpapers(response.data.hits);
    } catch (err) {
      setError(err.message);
      console.log("Error fetching wallpapers:", err); // Log any errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Search Query Updated:", searchQuery); // Log the updated search query
    fetchWallpapers(searchQuery); // Fetch wallpapers when component mounts or when searchQuery changes
  }, [searchQuery]); // This effect depends on searchQuery

  // Call fetchWallpapers when component mounts with default query
  useEffect(() => {
    fetchWallpapers('nature'); // Load default wallpapers for nature
  }, []);
  

  // Handle download of image
  const downloadImage = async (imageUrl) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Please grant media library permissions to download images.');
        return;
      }

      const fileUri = FileSystem.documentDirectory + imageUrl.split('/').pop(); // Create a local file path
      const downloadResult = await FileSystem.downloadAsync(imageUrl, fileUri);  // Download the image

      await MediaLibrary.createAssetAsync(downloadResult.uri);  // Save the image to the gallery
      Alert.alert('Success', 'Wallpaper downloaded successfully!');
    } catch (error) {
      Alert.alert('Error', 'An error occurred while downloading the image.');
      console.log(error);
    }
  };

  const toggleBookmark = (item) => {
    if (bookmarkedWallpapers.some((wallpaper) => wallpaper.id === item.id)) {
      setBookmarkedWallpapers(
        bookmarkedWallpapers.filter((wallpaper) => wallpaper.id !== item.id)
      );
    } else {
      setBookmarkedWallpapers([...bookmarkedWallpapers, item]);
    }
  };
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

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: isDarkMode ? '#121212' : '#fff' }}>
        <View style={[styles.loadingContainer, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f2f2f2' }]}>
      <FlatList
        data={wallpapers}
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

export default HomeScreen;
