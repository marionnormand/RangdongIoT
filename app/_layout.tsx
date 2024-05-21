import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import HomeScreen from './index'; // Importez votre écran d'accueil
import EditScreen from './edit';

import { useColorScheme } from '@/hooks/useColorScheme';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="index" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="edit" component={EditScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </ThemeProvider>
  );
}

export default RootLayout;