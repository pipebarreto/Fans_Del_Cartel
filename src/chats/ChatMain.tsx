import { StyleSheet, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { ref, onValue,} from'firebase/database';
import { Input, Button } from'react-native-elements';
import { ListItem } from'react-native-elements';
import { database } from '../config/firebase';
import { Dialog } from '@rneui/themed';
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';
import LinearGradient from 'react-native-linear-gradient';

export default function ChatMain({navigation}) {

  const [indexes, setIndexes] = useState([]);
  const [filtering, setFiltering] = useState('');

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

      const filtered = indexes.filter((item)  => {
        return (Object.values(item).join('').toLowerCase().includes(filtering.toLocaleLowerCase()))})

    
      const renderItem = ({ item, index }) => {
        return (
          
          <View>
            <ListItem containerStyle={{backgroundColor:'#EAF6F6'}} underlayColor={'#150050'} topDivider  onPress={() => navigation.navigate('Chat Room', { data: item })} hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>

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
 

        <View style={{paddingTop:20, flex: 1, backgroundColor:'white'}}>

        <Input label="Buscar tema" placeholder='Buscar tema...' onChangeText={text => setFiltering(text)}  value={filtering} autoCompleteType={undefined} />

        <View style={{flex:1}}>
          {indexes=='' &&(<DialogLoading/>)}

        <FlatList  data={filtered} renderItem={renderItem} keyExtractor={( index) => index.toString()}/>
        </View>

      </View>


    )
}

