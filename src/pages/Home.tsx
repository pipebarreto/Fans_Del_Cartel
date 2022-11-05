import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Input, Text } from'react-native-elements';
import { Button } from '@rneui/base';
import { Image } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import RNRestart from 'react-native-restart'
import { NativeModules } from "react-native";
import SoundPlayer from 'react-native-sound-player'
import {  ImageBackground} from "react-native";


export default function Home ({ navigation }){

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    console.log(auth);

    const signOutNow = () => {
        signOut(auth).then(() => {
           NativeModules.DevSettings.reload();
        }).catch((error) => {
        });
    }

  /*  try {

      const test=SoundPlayer.playUrl('https://api.spreaker.com/v2/episodes/51708600/download.mp3')
      console.log(test);
  } catch (e) {
      console.log(`cannot play the sound file`, e)
  }*/


    return(
      <View style={{backgroundColor: 'c'}}>
        <ScrollView>

  

        <View style={[styles.container, {width:windowWidth}]}>
        

        <View >

        <Card>
        <Card.Title>¡Bienvenido!</Card.Title>
        <Card.Divider/>
     

          <Text >¡Hola,  {auth.currentUser.displayName}! Te damos la bienvenida a la aplicación para fans del Cartel de la Mega. 
          El Cartel de La mega es un programa de las noches en Colombia que abarca principalmente los temas de relaciones de pareja y lo paranormal.</Text>

          <View style={[styles.container, {paddingTop:15}]}>

          <Button  buttonStyle={{width:windowWidth/3, borderRadius: 10, /*backgroundColor: '#150050'*/}}
            style={{paddingHorizontal:windowWidth/22}} title="Cambiar nombre" onPress={signOutNow} />

          <Button buttonStyle={{width:windowWidth/3, borderRadius: 10, /*backgroundColor: '#150050'*/}}
           style={{paddingHorizontal:windowWidth/22}} title="Cerrar sesión" onPress={signOutNow} />

          </View>
         </Card>
         </View>

         <View style={styles.item}>

        <Card>
        <Card.Title>Nuestro himno</Card.Title>
        <Card.Divider/>


        <Text >Payasiiin! Payasiin! yo soy un Payasiiin! Cuidado con los payasos, porque soy un payasin!</Text>

        </Card>
        </View>

        <View style={styles.item}>

        <Card>
        <Card.Title>Horario</Card.Title>
        <Card.Divider/>


        <Text>Escúchalos de Domingo a Jueves desde las 7pm hasta la media noche (hora Colombia).</Text>

        </Card>
        </View>

       
         </View>


        

        <View style={styles.item}>

        <Card>
        <Card.Title>Nuestro himno</Card.Title>
        <Card.Divider/>
     

          <Text >Payasiiin! Payasiin! yo soy un Payasiiin! Cuidado con los payasos, porque soy un payasin!</Text>

         </Card>


         <View style={styles.item}>

        <Card>
        <Card.Title>Nuestro himno</Card.Title>
        <Card.Divider/>


        <Text >Payasiiin! Payasiin! yo soy un Payasiiin! Cuidado con los payasos, porque soy un payasin!</Text>

        </Card>
        </View>
       
         </View>


         <View style={[styles.container, {width:windowWidth}]}>
        

        <View style={styles.item}>

        <Card>
        <Card.Title>Nuestro himno</Card.Title>
        <Card.Divider/>
     

          <Text >Payasiiin! Payasiin! yo soy un Payasiiin! Cuidado con los payasos, porque soy un payasin!</Text>

         </Card>
         </View>

         <View style={styles.item}>

        <Card>
        <Card.Title>Nuestro himno</Card.Title>
        <Card.Divider/>


        <Text >Payasiiin! Payasiin! yo soy un Payasiiin! Cuidado con los payasos, porque soy un payasin!</Text>

        </Card>
        </View>
       
         </View>

         <View style={[styles.container, {width:windowWidth}]}>
        

        <View style={styles.item}>

        <Card>
        <Card.Title>Nuestro himno</Card.Title>
        <Card.Divider/>
     

          <Text >Payasiiin! Payasiin! yo soy un Payasiiin! Cuidado con los payasos, porque soy un payasin!</Text>
          <Text >Payasiiin! Payasiin! yo soy un Payasiiin! Cuidado con los payasos, porque soy un payasin!</Text>

         </Card>
         </View>

       
         </View>



      </ScrollView>
      
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    item :{
      flex: 0.5, //why this doesnt work???
      // width: 150, //using fixed item width instead of flex: 0.5 works
      //padding: 10,
      //backgroundColor: 'red',
      // flexGrow: 1,
      // flexShrink: 0,
    }
  });