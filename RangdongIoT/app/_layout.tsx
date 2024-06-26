import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ErrorProvider } from './error/errorContext';
import { AuthProvider } from './authent/AuthContext';

import LoginPage from './loginPage';
import HomePage from './homePage';
import EditPage from './editPage';
import NewPage from './newPage';
import SignupPage from './signupPage';
import FilterPage from './filterPage';
import EditProfile from './editProfile';
import LEDcontroller from './ledControl';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
//const Stack = createStackNavigator();

export type RootStackParamList = {
  editPage: { rectangle: any };
  loginPage: undefined; 
  homePage: undefined; 
  newPage: undefined; 
  signupPage: undefined; 
  filterPage: { dataFilter: any };
  editProfile: undefined;   
  ledControl: {datatosend : any, datatosend2 : any, datatosend3 : any};
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
    <ErrorProvider>
      <AuthProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="loginPage" component={LoginPage} />
          <Stack.Screen name="homePage" component={HomePage} />
          <Stack.Screen name="editPage" component={EditPage} />
          <Stack.Screen name="newPage" component={NewPage} />
          <Stack.Screen name="signupPage" component={SignupPage} />
          <Stack.Screen name="filterPage" component={FilterPage} />
          <Stack.Screen name="editProfile" component={EditProfile} />
          <Stack.Screen name="ledControl" component={LEDcontroller} />
      </Stack.Navigator>
      </AuthProvider>
    </ErrorProvider>
  );
};

export default RootLayout;