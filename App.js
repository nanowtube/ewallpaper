import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawer from './CustomDrawer';
import { useTheme, ThemeProvider } from './ThemeContext';
import HomeTopBar from './HomeTopBar';
import SearchScreen from './screens/SearchScreen'; // Import SearchScreen
import { Image, View, StyleSheet} from 'react-native'; // Import Image and Vi
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator(); // Create Stack Navigator

// Stack Navigator to manage Home and Details screens
function HomeStack({ setBookmarkedWallpapers, bookmarkedWallpapers, searchQuery }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
      >
        {props => (
          <HomeScreen
            {...props}
            setBookmarkedWallpapers={setBookmarkedWallpapers}
            bookmarkedWallpapers={bookmarkedWallpapers}
            searchQuery={searchQuery} // Pass searchQuery as a prop
          />
        )}
      </Stack.Screen>
      {/* Add SearchScreen to the stack */}
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Search Wallpapers' }} // Set the title
      />
    </Stack.Navigator>
  );
}

function AppContent() {
    const [bookmarkedWallpapers, setBookmarkedWallpapers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('nature');
    const { isDarkMode } = useTheme();
  
    useEffect(() => {
      // Load bookmarks from AsyncStorage when the app starts
      const loadBookmarks = async () => {
        try {
          const storedBookmarks = await AsyncStorage.getItem('bookmarkedWallpapers');
          if (storedBookmarks) {
            setBookmarkedWallpapers(JSON.parse(storedBookmarks));
          }
        } catch (error) {
          console.error("Error loading bookmarks:", error);
        }
      };
  
      loadBookmarks();
    }, []);
  
    const toggleBookmark = async (wallpaper) => {
      setBookmarkedWallpapers(prevState => {
        const isBookmarked = prevState.some(item => item.id === wallpaper.id);
        let updatedBookmarks;
        
        if (isBookmarked) {
          // If the wallpaper is already bookmarked, remove it
          updatedBookmarks = prevState.filter(item => item.id !== wallpaper.id);
        } else {
          // If the wallpaper is not bookmarked, add it
          updatedBookmarks = [...prevState, wallpaper];
        }
  
        // Save the updated bookmarks to AsyncStorage
        AsyncStorage.setItem('bookmarkedWallpapers', JSON.stringify(updatedBookmarks)).catch(error => {
          console.error("Error saving bookmarks:", error);
        });
  
        return updatedBookmarks;
      });
    };
  

    const handleSearch = (query) => {
      setSearchQuery(query); // Set the search query when searching from top bar or search screen
    };
  
    const handleSearchCategory = (category) => {
      setSearchQuery(category); // Set the search query to the selected category
    };
  
    const handleEditorsChoice = () => {
      setSearchQuery('editors_choice'); // Set the query for Editor's Choice
    };
    const handleSort = (sortType) => {
      setSortOrder(sortType); // This will automatically refetch wallpapers due to the useEffect
    };
  
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? '#121212' : '#fff',
            height: 90, // Increased height for the header
          },
          headerTintColor: isDarkMode ? '#fff' : '#000',
          drawerStyle: {
            backgroundColor: isDarkMode ? '#121212' : '#fff',
          },
          drawerLabelStyle: {
            color: isDarkMode ? '#fff' : '#000',
          },
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Image
                source={isDarkMode ? require('./img/logolight.png') : require('./img/logodark.png')}
                style={{ width: 100, height: 40 }} // Adjust size as needed
                resizeMode="contain" // Ensure image fits well
              />
            </View>
          ),
          headerTitleAlign: 'center', // Center align the title
          headerRight: () => (
            <HomeTopBar onSearch={handleSearch} onSort={handleSort} isDarkMode={false} />
          ),
        }}
      >
        {/* Home Stack with Home and Details Screens */}
        <Drawer.Screen
          name="HomeStack"
          options={{
            drawerIcon: () => <Icon name="home" size={24} />,
            title: 'Home',
          }}
        >
          {props => (
            <HomeStack
              {...props}
              setBookmarkedWallpapers={setBookmarkedWallpapers}
              bookmarkedWallpapers={bookmarkedWallpapers}
              searchQuery={searchQuery} // Pass searchQuery to the HomeStack
            />
          )}
        </Drawer.Screen>

        <Drawer.Screen
          name="Bookmarks"
          options={{
            drawerIcon: () => <Icon name="bookmark" size={24} />,
          }}
        >
          {props => (
            <BookmarksScreen
              {...props}
              bookmarkedWallpapers={bookmarkedWallpapers}
              toggleBookmark={toggleBookmark}  // Pass toggleBookmark here
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Search"
          options={{
            drawerIcon: () => <Icon name="search" size={24} />,
            title: 'Search Wallpapers',
          }}
        >
          {props => (
            <SearchScreen
              {...props}
              onSearch={handleSearch}            // For handling custom search queries
              onSearchCategory={handleSearchCategory}  // For handling category-based search
              onEditorsChoice={handleEditorsChoice}    // For handling Editor's Choice search
              isDarkMode={isDarkMode}             // For dark mode styling
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
});

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
