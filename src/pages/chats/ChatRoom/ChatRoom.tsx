import { StyleSheet, View, FlatList} from 'react-native';
import { useState, useEffect } from 'react';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';
import { Header } from'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Input, Button } from'react-native-elements';
import { ListItem } from'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


//This component is not functional. Just for testing...
//This component is not functional. Just for testing...
//This component is not functional. Just for testing...

export default function ChatRoom({route}) {

    const{ data } = route.params;

    const [items, setItems] = useState([]);
    const [indexes, setIndexes] = useState([]);
  
const firebaseConfig = {
  apiKey: "AIzaSyAcXRTebgKdw9jh0zIA6-dklYcKTd4rU_A",
  authDomain: "fans-del-cartel.firebaseapp.com",
  //databaseURL: "https://fans-del-cartel-default-rtdb.firebaseio.com",
  projectId: "fans-del-cartel",
  storageBucket: "fans-del-cartel.appspot.com",
  messagingSenderId: "767068644787",
  appId: "1:767068644787:web:99528ece2231768e9e97c6",
  measurementId: "G-V1NBLLVS3C"
};

  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
    
  useEffect(() => {
    const itemsRef = ref(database, `chats/${data}`); 
     onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();   
        if(!data) {
          setItems([]);
          setIndexes([]);}        
        else{
        setItems(Object.values(data));
        setIndexes(Object.keys(data));
        }
      })}, 
      []);

      const add = (message) => { 
        push(    
            ref(database,  `chats/${data}`),     
            { 'message': message});
        }
    
        const renderItem = ({ item, index }) => (


          <View > 
  
          <ListItem style={{ margin: 1 }} hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
  
            <ListItem.Content>


              <ListItem.Subtitle>{item.message}</ListItem.Subtitle>

            </ListItem.Content>
   
  
          </ListItem>
          
          </View>)   
   

    return(



          
      <View style={{paddingTop:10, paddingHorizontal:10, flex:1}}>

      

      <View style={{flex:1}}>
      <FlatList  data={items} renderItem={renderItem} keyExtractor={(item, index) => index.toString()}/>

      </View >

          <MessageInput onPressSend={add}/>
      </View>


    )
}

