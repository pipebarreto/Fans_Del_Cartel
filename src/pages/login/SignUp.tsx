import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const register = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registered
            const user = userCredential.user;
            //sendEmailVerification(user);
            updateProfile(user, {
                displayName: name,
                photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
            })
            .then(() => {
                //sendEmailVerification(user);
                alert('Registrado con éxito! Por favor ingrese.');
            })
            .catch((error) => {
                alert(error.message);
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Ingresa tu nombre'
                label='Nombre'
                leftIcon={{ type: 'material', name: 'person' }}
                value={name}
                onChangeText={text => setName(text)}
            />
            <Input
                placeholder='Ingresa tu correo electrónico'
                label='Correo electrónico'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Ingresa tu clave'
                label='Clave'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password} onChangeText={text => setPassword(text)}
                secureTextEntry
            />


            <Button title='Crear cuenta'  buttonStyle={styles.buttonStyle} style={styles.button} onPress={register} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 60,
    },
    button: {
        width: windowWidth*0.9,
        marginTop: 30,
        
    },
    buttonStyle: {
        borderRadius: 10,
        //backgroundColor: '#150050',

    }

});

export default SignUp;