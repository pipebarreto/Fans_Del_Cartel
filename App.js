import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './pages/Home';
import Curiosidades from './pages/Curiosidades';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs'
import Chat from './pages/chats/ChatMain';
import PagesNavigator from './pages/PagesNavigator';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


export default function App() {

  
  return (


  <SafeAreaProvider>
    <Header  containerStyle={{backgroundColor:'#150050'}} centerComponent={{ text: 'FANS DEL CARTEL DE LA MEGA', style: { color: '#fff'}}} />

    <View style={{flex:1, padding:5}}>
    <PagesNavigator/>
    </View>
  </SafeAreaProvider>




  );
}
