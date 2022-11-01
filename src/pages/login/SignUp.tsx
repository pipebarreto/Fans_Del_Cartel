import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';

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
                placeholder='Ingrese su nombre'
                label='Nombre'
                value={name}
                onChangeText={text => setName(text)}
            />
            <Input
                placeholder='Ingrese su correo electrónico'
                label='Correo electrónico'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Ingrese su clave'
                label='Clave'
                value={password} onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Input
                placeholder='Ingrese su imagen'
                label='Imagen'
                value = {avatar}
                onChangeText={text => setAvatar(text)}
            />

            <Button title='Crear cuenta' onPress={register} style={styles.button} />
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

export default SignUp;