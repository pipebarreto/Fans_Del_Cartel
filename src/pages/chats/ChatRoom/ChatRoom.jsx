import React, { useState, useEffect } from 'react'
import {  Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import {  View, Text } from 'react-native';
import { push, ref, onValue, query, limitToLast } from'firebase/database';
import { auth, database } from '../../../config/firebase';

export default function ChatRoom2({route}) {
  const [messages, setMessages] = useState([]);

  const{ data } = route.params;

useEffect(() => {
  const itemsRef = query(ref(database, `chats/${data}`), limitToLast(50));

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
        
  function renderInputToolbar (props) {
    return <InputToolbar {...props} containerStyle={{
      borderRadius:15,
      backgroundColor:'white'
    }}/>
  }

  const renderChatFooter = () => {
    return(
      <View style={{height:10}}></View>
    )
}
          
  return (
    <View style={{flex:1, backgroundColor:'#EAF6F6', paddingVertical:10}}>
    <GiftedChat
      wrapInSafeArea={false}
      renderChatFooter={renderChatFooter}
      renderInputToolbar={renderInputToolbar} 
      label='Enviar'
      placeholder='Escribir mensaje...'
      messages={messages}
      onSend={messages => add(messages)}
      inverted={false}
      renderUsernameOnMessage
      initialNumToRender={5}
      renderBubble={renderBubble}
      user={{
        _id: auth.currentUser.uid,
        name: auth.currentUser.displayName
      }}
    />
    </View>

  )
}