import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Input, Text } from'react-native-elements';
import { Button } from '@rneui/base';
import { Image } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import RNRestart from 'react-native-restart'
import { NativeModules } from "react-native";
import { Icon } from '@rneui/themed';
//import { AdMobBanner } from "expo-ads-admob";


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


    return(
      <View >
        <ScrollView>     

        <Card>
        <Card.Title>¡Bienvenido!</Card.Title>
        <Card.Divider/>

          <Text >¡Bienvenido,  {auth.currentUser.displayName}! 
          El Cartel de La mega es un programa de las noches en Colombia que abarca principalmente los temas de relaciones de pareja y el tema paranormal.</Text>

          <View style={[styles.container, {paddingTop:15}]}>

          <Button  buttonStyle={{width:windowWidth/3, borderRadius: 10, /*backgroundColor: '#150050'*/}}
            style={{paddingHorizontal:windowWidth/22}} title="Cambiar Nombre" onPress={signOutNow} />

          <Button buttonStyle={{width:windowWidth/3, borderRadius: 10, /*backgroundColor: '#150050'*/}}
           style={{paddingHorizontal:windowWidth/22}} title="Cerrar sesión" onPress={signOutNow} />

          </View>
         </Card>

         <Card>
          <Card.Title>Nuestro himno</Card.Title>
          <Card.Divider/>
          <Text >Payasiiin! Payasiin! yo soy un Payasiiin! Cuidado con los payasos, porque soy un payasin!</Text>
        </Card>

        <Card>
          <Card.Title>Horario  {<Icon name="today" size={"small"}/>}</Card.Title>
          <Card.Divider/>
          <Text >De Domingo a Jueves de 7pm hasta la media noche.</Text>order the code
        </Card>

        <Card>
          <Card.Title>Secciones</Card.Title>
          <Card.Divider/>
          <Card.Title>Cartel Normal: 7pm - 9 pm</Card.Title>
          <Text >Quéjese, Volver al futuro, Caza infieles, Emprendimientos....</Text>
          <Card.Title/>
          <Card.Title>Paranormal: 9pm - 12am</Card.Title>

          <Text >Brujería, Ovni, Conspiraciones, Exorcismos, Fantasmas, Astrología, Predicciones...</Text>

        </Card>

        <Card>
          <Card.Title>Noticias {<Icon name="article" size={"small"}/>}</Card.Title>
          <Card.Divider/>
          <Text >Brujería, Ovni, Conspiraciones, Exorcismos, Fantasmas, Astrología, Predicciones...</Text>
        </Card>

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