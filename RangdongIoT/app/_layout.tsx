import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';

import HomePage from './homePage';
import EditPage from './editPage';
import NewPage from './newPage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
//const Stack = createStackNavigator();

export type RootStackParamList = {
  editPage: { rectangle: any };
  homePage: undefined; 
  newPage: undefined; 
};

const Stack = createStackNavigator<RootStackParamList>();

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="homePage" component={HomePage} />
      <Stack.Screen name="editPage" component={EditPage} />
      <Stack.Screen name="newPage" component={NewPage} />
    </Stack.Navigator>
  );
};

export default RootLayout;