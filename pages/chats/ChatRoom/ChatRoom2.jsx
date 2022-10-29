import React, { useState, useCallback, useEffect } from 'react'
import {  Bubble, GiftedChat } from 'react-native-gifted-chat'
import {  View  } from 'react-native';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';
import { auth, database } from '../../config/firebase';



export default function ChatRoom2({route}) {
  const [messages, setMessages] = useState([]);

  const{ data } = route.params;


useEffect(() => {
  const itemsRef = ref(database, `chats/${data}`); 
   onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();   
      if(!data) {
        setMessages([])}        
      else{
        const data = snapshot.val();
        const keys = Object.keys(data);
        // Combine keys with data 
        const dataWithKeys = Object.values(data).map((obj, index) => { 

          return {...obj, _id:keys[index] , text:obj.message, user:{_id:obj.user._id, name: obj.user.name }}
      
       });
        setMessages(dataWithKeys)

    }})
    }, []);

  
    const add = (message) => { 
      console.log(message);
      push(    
        ref(database,  `chats/${data}`),     
        { message: message[0].text,  user:{_id: message[0].user._id, name: message[0].user.name} });
    }

    function renderBubble(props) {
      return (
          <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: '#d3d3d3',
                },
              }}
          />);}


 /* const onSend = useCallback((messages = []) => {
    push(    
      ref(database,  `chats/${data}`),     
      { messages});
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])*/


  //const enviar = (props) => <Send {...props} label="Enviar" />;


  return (

    <View style={{flex:1}}>
    <GiftedChat
    
      messages={messages}
      onSend={messages => add(messages)}
      inverted={false}
      renderUsernameOnMessage={true}
      initialNumToRender={15}
      renderBubble={renderBubble}
      multiline={true}
      user={{
        _id: auth.currentUser.uid,
        name: auth.currentUser.displayName
      }}
    />
    {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
    </View>
  )
}