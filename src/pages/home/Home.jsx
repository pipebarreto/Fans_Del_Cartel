import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Input, Text, Button } from'react-native-elements';
import { signOut } from "firebase/auth";
import { Icon } from '@rneui/themed';
import { Overlay } from 'react-native-elements';
import { useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import {  ref, onValue} from'firebase/database';
import { auth, database } from '../../config/firebase';
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';
import BrackgroundGradient from "../../login/BrackgroundGradient";


//import { AdMobBanner } from "expo-ads-admob";


export default function Home ({ navigation }){

    const [newName, setNewName] = useState('');
    const [isVisible, setisVisible] = useState(false);
    const [news, setNews] = useState([]);

    const signOutNow = () => {
        signOut(auth).then(() => {
          navigation.replace('Sign in')
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
      <BrackgroundGradient>
        <ScrollView>     

        <Card>
        <Card.Title>??Bienvenido!</Card.Title>
        <Card.Divider/>

          <Text >??Bienvenido,  {auth.currentUser.displayName}! 
          El Cartel de La mega es un programa de las noches en Colombia que abarca principalmente los temas de relaciones de pareja y el tema paranormal.</Text>

         </Card>

         <Card>
          <Card.Title>Nuestro himno</Card.Title>
          <Card.Divider/>
          <Text >Payasiiin! Payasiin! yo soy un Payasiiin! Cuidado con los payasos, porque soy un payasin!</Text>
        </Card>

        <Card>
        <Card.Title>Horario  {<Icon name="today" size={20}/>}</Card.Title>
          <Card.Divider/>
          <Card.Title>Cartel Normal: 7pm - 9 pm</Card.Title>
          <Text >Qu??jese, Volver al futuro, Caza infieles, Emprendimientos....</Text>
          <Card.Title/>
          <Card.Title>Paranormal: 9pm - 12am</Card.Title>

          <Text >Brujer??a, Ovni, Conspiraciones, Exorcismos, Fantasmas, Astrolog??a, Predicciones...</Text>

        </Card>


        <Card>
          <Card.Title>Noticias {<Icon name="article" size={20} />}</Card.Title>
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
          <Card.Title>Perfil {<Icon name= "account-edit" type='material-community'
          onPress={openUpdate} size={20} color={"blue"}/>}
          
          </Card.Title>
          <Card.Divider/>

          <Button buttonStyle={{borderRadius: 5, /*backgroundColor: '#150050'*/}}
            title="Cerrar sesi??n" onPress={signOutNow} />
          
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

        <View style={{paddingVertical:5}}>
        <Button title="Actualizar Nombre" onPress={updateName} />
        </View>
        <View style={{paddingVertical:15}}>
        <Button title="Cancelar"  onPress={openUpdate} />
        </View>
        </Overlay>
      
      </BrackgroundGradient>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent:  'space-between'
    },
    item :{
      flex: 0.5,
      paddingHorizontal:5
    }
  });