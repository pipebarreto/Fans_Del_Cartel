import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { auth } from './config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const LogIn = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const openRegisterScreen = () => {
      navigation.navigate('Crear cuenta');
    };

    const signin = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.replace('Pages');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder='Ingrese su nombre'
                label='Nombre'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Ingrese su clave'
                label='Clave'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Button title="Ingresar" style={styles.button} onPress={signin} />
            <Button title="Crear cuenta" style={styles.button} onPress={openRegisterScreen} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 100,
    },
    button: {
        width: 370,
        marginTop: 10
    }
});

export default LogIn;