import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatMain from './ChatMain';
import ChatRoom from './ChatRoom/ChatRoom';

const Stack = createNativeStackNavigator();

export default function ChatNavigator() {
    
    return (

        <Stack.Navigator>
            <Stack.Screen name="Temas"component={ChatMain} options={{ headerShown: false }}/>
            <Stack.Screen name="Chat Room" component={ChatRoom}   options={({ route }) => ({ title: route.params.name })}/>
        </Stack.Navigator>
 
    );
}

