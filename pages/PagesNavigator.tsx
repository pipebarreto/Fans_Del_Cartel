import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './Home';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs'
import ChatMain from './chats/ChatMain';
import { Icon } from'react-native-elements';
import ChatNavigator from './chats/ChatNavigator';
import AudiosMain from './audios/AudiosMain';


const Tab = createBottomTabNavigator();



export default function PagesNavigator() {

  return (

    
  <Tab.Navigator screenOptions={({route }) => ({ 
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') { 
              iconName = 'home';            
            } else if (route.name === 'Chat') {  
                iconName = 'forum';
            } else if (route.name === 'Audio') {  
              iconName = 'library-music';
          }              
          return <Icon name={iconName} size={size} color={color} tvParallaxProperties={undefined}  />
           }
          })}>

            
            
      <Tab.Screen name="Home"component={Home} options={{ headerShown: false }}/>
      <Tab.Screen name="Chat"component={ChatNavigator} options={{ headerShown: false }}/>
      <Tab.Screen name="Audio"component={AudiosMain} options={{ headerShown: false }}/>

    </Tab.Navigator>

  


  );
}

/*const screenOptions = {
  tabBarStyle:{
    backgroundColor:'#150050',
    height:100,
    
  },
  tabBarItemStyle:{
    backgroundColor:'#00ff00',
    margin:5,
    borderRadius:10,
  }
};*/