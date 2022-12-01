import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
