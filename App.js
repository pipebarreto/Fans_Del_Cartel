import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from'react-native-elements';
import { SafeAreaProvider, SafeAreaView  } from 'react-native-safe-area-context';
import PagesNavigator from './src/pages/PagesNavigator';
import LogInNavigator from './src/login/LogInNavigator';
import { auth, database } from './src/config/firebase';
import React, { useState, useCallback, useEffect } from 'react'
import BrackgroundGradient from './src/login/BrackgroundGradient';


const Stack = createNativeStackNavigator();

// Buttons in the home page
// A lot of padding in the top of chat component

export default function App() {

  const [isLoaded, setIsLoaded] = useState(false);

  auth.onAuthStateChanged((user) => {
    setIsLoaded(true);
  });

  //TrackPlayer.registerPlaybackService(() => PlaybackService);
  
  return (

<>
    <SafeAreaProvider>
    <Header  containerStyle={{backgroundColor:'#150050'}} centerComponent={{ text: 'FANS DEL CARTEL', style: { color: '#fff'}}} />
      
    {isLoaded && (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{headerShown: false, contentStyle:{backgroundColor:'red'}}}>
        
        {!auth?.currentUser?.emailVerified ?
          <>
        <Stack.Screen name='Sign in' component={LogInNavigator} />
        <Stack.Screen name='Pages' component={PagesNavigator} />
        </>:
        <>
        <Stack.Screen name='Pages' component={PagesNavigator} />
        <Stack.Screen name='Sign in' component={LogInNavigator} />
        </>}
      
      </Stack.Navigator>
 
    </NavigationContainer>
    )}
    </SafeAreaProvider>

    </>

  );
}
