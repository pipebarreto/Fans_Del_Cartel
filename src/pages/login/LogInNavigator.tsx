import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from '../Home';

import { createBottomTabNavigator } from'@react-navigation/bottom-tabs'
import ChatMain from '../../chats/ChatMain';
import { Icon } from'react-native-elements';
import ChatNavigator from '../../chats/ChatNavigator';
import AudiosMain from '../../audios/AudiosMain';
import LogIn from './LogIn';
import SignUp from './SignUp';


const Stack = createNativeStackNavigator();




export default function LogInNavigator() {

  return (    

      <Stack.Navigator >
        <Stack.Screen name='Ingresar' component={LogIn} options={{ headerShown: false }}/>
        <Stack.Screen name='Crear cuenta' component={SignUp} />
      </Stack.Navigator>


  );
}
