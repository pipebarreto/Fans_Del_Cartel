import { StyleSheet, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';
import { Header } from'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Input, Button } from'react-native-elements';
import { ListItem } from'react-native-elements';

export default function ChatMain({navigation}) {

  const [items, setItems] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  
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
        onValue(ref(database, 'chats/'), (snapshot) => {
          const data = snapshot.val();
          if(!data) {
          setIndexes([]);    
          }else{
            setIndexes(Object.keys(data));
          }
        })
      }, []);
    
      const renderItem = ({ item, index }) => {
        return (


          <View>

            <ListItem style={{ margin: 5 }} onPress={() => navigation.navigate('Chat Room', { data: item })} hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>

              <ListItem.Content>
                {item == "General" || item == "Paranormal" ?
                  <ListItem.Title style={{ fontWeight: "bold", fontSize: 20 }}>{item}</ListItem.Title> :
                  <ListItem.Title>{item}</ListItem.Title>}
              </ListItem.Content>

              {/* <ListItem.Subtitle style={{ color: "grey" }}>Show on map</ListItem.Subtitle> */}
              <ListItem.Chevron />


            </ListItem>

          </View>);
      }       


    return(

        <View>

          
        <View style={{paddingTop:25}}>

        <Input label="Buscar tema" placeholder='Buscar tema...' autoCompleteType={undefined} />

        <View>
        <FlatList  style={{paddingTop:20}} data={indexes} renderItem={renderItem} keyExtractor={( index) => index.toString()}/>
        </View>

        

      </View>





      </View>
    )
}

