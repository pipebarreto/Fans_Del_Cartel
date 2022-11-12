import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Input, Text } from'react-native-elements';
import { Button } from '@rneui/base';
import { Image } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { signOut } from "firebase/auth";
import RNRestart from 'react-native-restart'
import { NativeModules } from "react-native";
import { Icon } from '@rneui/themed';
import { Overlay } from 'react-native-elements';
import { useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';
import { auth, database } from '../../config/firebase';
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';

//import { AdMobBanner } from "expo-ads-admob";


export default function Home ({ navigation }){

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [newName, setNewName] = useState('');
    const [isVisible, setisVisible] = useState(false);
    const [news, setNews] = useState([]);

    console.log(auth);

    const signOutNow = () => {
        signOut(auth).then(() => {
           NativeModules.DevSettings.reload();
        }).catch((error) => {
        });
    }

    const openUpdate = () => {
      if (isVisible==true){
          setisVisible(false)
      }else{
          setisVisible(true)
          setNewName('');
      }
    }; 

    useEffect(() => {
      const itemsRef = ref(database, `news/`); 
       onValue(itemsRef, (snapshot) => {
          const data = snapshot.val();   
          if(!data) {
            setNews([])}        
          else{
            const data = snapshot.val();
            const keys = Object.keys(data);
            // Combine keys with data 
            const dataWithKeys = Object.values(data).map((obj, index) => { 
    
              return {...obj, _id:keys[index] , title:obj.title, content:obj.content }        
           });
            setNews(dataWithKeys)   
        }})
        }, []);

        console.log(news);
  

    const updateName=()=>{
      updateProfile(auth.currentUser, {
      displayName: newName
    }).then(() => {
      // Profile updated!
      setisVisible(false)
    }).catch((error) => {
      // An error occurred
      setisVisible(false)
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

         </Card>

         <Card>
          <Card.Title>Nuestro himno</Card.Title>
          <Card.Divider/>
          <Text >Payasiiin! Payasiin! yo soy un Payasiiin! Cuidado con los payasos, porque soy un payasin!</Text>
        </Card>

        <Card>
          <Card.Title>Horario  {<Icon name="today" size={"small"}/>}</Card.Title>
          <Card.Divider/>
          <Text >De Domingo a Jueves de 7pm hasta la media noche.</Text>
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
          {news?
          news.map((news, index)=>(
              
            <View key={index}>
            
            <Card.Title>{news.title}</Card.Title>
            <Text>{news.content}</Text>
            <Card.Title/>
            <Card.Divider/>
          </View>
          )):<DialogLoading/>}

        </Card>

        <Card>
          <Card.Title>Perfil {<Icon name="person" size={"small"}/>}</Card.Title>
          <Card.Divider/>

          <View style={[styles.container, {paddingTop:0}]}>

          <Button  buttonStyle={{width:windowWidth/3, borderRadius: 10, /*backgroundColor: '#150050'*/}}
            style={{paddingHorizontal:windowWidth/22}} title="Cambiar Nombre" onPress={openUpdate} />

          <Button buttonStyle={{width:windowWidth/3, borderRadius: 10, /*backgroundColor: '#150050'*/}}
          style={{paddingHorizontal:windowWidth/22}} title="Cerrar sesión" onPress={signOutNow} />

          </View>
          
        </Card>

      </ScrollView>

      <Overlay isVisible={isVisible}>

        <View style={{paddingTop:15}}>
        <Input
                    placeholder={auth.currentUser.displayName}
                    label='Ingresa tu nuevo nombre para mostrar'
                    leftIcon={{ type: 'material', name: 'person' }}
                    value={newName}
                    onChangeText={text => setNewName(text)} autoCompleteType={undefined}/>
        </View>

        <Button title="Actualizar Nombre" buttonStyle={styles.buttonStyle} style={{paddingVertical:25}} onPress={updateName} />

        <Button title="Cancelar" buttonStyle={styles.buttonStyle} style={{ width:windowWidth*0.9, paddingVertical:15}} onPress={openUpdate} />
        </Overlay>
      
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
      flex: 0.5
    }
  });