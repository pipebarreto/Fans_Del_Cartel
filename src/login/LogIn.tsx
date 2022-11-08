import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider } from 'firebase/auth';
import { Overlay } from 'react-native-elements';
import BrackgroundGradient from './BrackgroundGradient';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LogIn = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setisVisible] = useState(false);
    const [email2, setEmail2] = useState('');

    const provider = new GoogleAuthProvider();

    const openRegisterScreen = () => {
      navigation.navigate('Crear cuenta');
    };

    const openForgotPassword = () => {
        if (isVisible==true){
            setisVisible(false)
        }else{
            setisVisible(true)
        }
      }; 
      
      const sendPassword = () => {
            sendPasswordResetEmail(auth, email2)
                .then(()=>{alert('Se ha envíado un correo para cambiar tu contraseña. Es probable que se encuentre en Correo no deseado');
                setisVisible(false);
                setEmail2('');
            })
      }; 

    const signin = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (userCredential.user.emailVerified == false){
                alert('Por favor verifica primero tu correo')
            }else{
          navigation.replace('Pages');
            }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    };

    const googleLogin = () => {

}

    

    return (

        <BrackgroundGradient>
                {/* <View style={styles.container}>*/ }

            <View style={{paddingVertical:20}}>
                <Image source={require('../../images/2025.png')} style={{ width: windowWidth / 2, height: windowHeight / 4, borderRadius:25, opacity:0.85 }} />
            </View>

            <Input
                placeholder='Ingresa tu correo electrónico'
                label='Correo electrónico'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)} autoCompleteType={undefined}            />
            <Input
                placeholder='Ingresa tu clave'
                label='Clave'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry autoCompleteType={undefined}            />
            <Button title="Ingresar" buttonStyle={styles.buttonStyle} style={styles.button} onPress={signin} />
            
            

            <Button title="¿Todavía no tienes una cuenta? Regístrate!" onPress={openRegisterScreen}
            titleStyle={{color: 'coral'}} buttonStyle={{marginVertical: 35}} type="clear"/>

            <Button title="¿Has olvidado tu contraseña?"  onPress={openForgotPassword}
            titleStyle={{color: '#039BE5'}} type="clear"/>

            
            <Overlay isVisible={isVisible}>

            <View style={{paddingTop:15}}>
            <Input
                        placeholder='Ingresa tu correo electrónico'
                        label='¿Olvidaste tu clave?'
                        leftIcon={{ type: 'material', name: 'email' }}
                        value={email2}
                        onChangeText={text => setEmail2(text)} autoCompleteType={undefined}/>
            </View>

            <Button title="Enviar correo" buttonStyle={styles.buttonStyle} style={{paddingVertical:25}} onPress={sendPassword} />

            <Button title="Cancelar" buttonStyle={styles.buttonStyle} style={{ width:windowWidth*0.9, paddingVertical:15}} onPress={openForgotPassword} />
            </Overlay>
            </BrackgroundGradient>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
    },
    button: {
        width: windowWidth*0.9,
        marginTop: 10,
        
    },
    buttonStyle: {
        borderRadius: 10,
       // backgroundColor: '#150050',

    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },

});

export default LogIn;