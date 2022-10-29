import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from'react-native-elements';
import { SafeAreaProvider, SafeAreaView  } from 'react-native-safe-area-context';
import PagesNavigator from './pages/PagesNavigator';
import LogInNavigator from './pages/LogInNavigator';
import { auth, database } from './pages/config/firebase';
import React, { useState, useCallback, useEffect } from 'react'



const Stack = createNativeStackNavigator();


export default function App() {

  const [isLoaded, setIsLoaded] = useState(false);

  auth.onAuthStateChanged((user) => {
    setIsLoaded(true);
  });

  
  
  return (

<>
  <SafeAreaProvider> 
    <Header  containerStyle={{backgroundColor:'#150050'}} centerComponent={{ text: 'FANS DEL CARTEL DE LA MEGA', style: { color: '#fff'}}} />
 

    {isLoaded && (
    <NavigationContainer>
      <Stack.Navigator >
        {!auth?.currentUser && (
        <Stack.Screen name='Sign in' component={LogInNavigator} options={{ headerShown: false }}/>)}
        <Stack.Screen name='Pages' component={PagesNavigator} options={{ headerShown: false }}/>
      
      </Stack.Navigator>
    </NavigationContainer>
    )}
    </SafeAreaProvider>

    </>


  );
}
