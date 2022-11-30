import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatMain from './ChatMain';
import ChatRoom from './ChatRoom/ChatRoom';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from'react-native-elements';
import ChatRoom2 from './ChatRoom/ChatRoom2';


const Stack = createNativeStackNavigator();

export default function ChatNavigator() {
    
    return (

        <Stack.Navigator>
            <Stack.Screen name="Temas"component={ChatMain} options={{ headerShown: false }}/>
            <Stack.Screen name="Chat Room" component={ChatRoom}  />
        </Stack.Navigator>
 
    );
}

