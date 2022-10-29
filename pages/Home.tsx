import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Input, Text } from'react-native-elements';
import { Button } from '@rneui/base';
import { Image } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import RNRestart from 'react-native-restart'
import { NativeModules } from "react-native";


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

        <ScrollView>

            <View style={{ alignItems: 'center', padding:25}}>
                <Image source={require('../images/2025.png')} style={{ width: windowWidth / 2, height: windowHeight / 4 }} height={undefined} width={undefined}/>
            </View>

            <Button title="Cerrar sesión" onPress={signOutNow} />

  

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

         <View style={styles.item}>

        <Card>
        <Card.Title>Nuestro himno</Card.Title>
        <Card.Divider/>


        <Text >Payasiiin! Payasiin! yo soy un Payasiiin! Cuidado con los payasos, porque soy un payasin!</Text>

        </Card>
        </View>
       
         </View>





      </ScrollView>
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