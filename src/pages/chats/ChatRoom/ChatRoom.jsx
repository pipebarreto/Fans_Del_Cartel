import React, { useState, useEffect } from 'react'
import {  Bubble, GiftedChat, InputToolbar, Send, LoadEarlier } from 'react-native-gifted-chat'
import {  View, Text } from 'react-native';
import { push, ref, onValue, query, limitToLast } from'firebase/database';
import { auth, database } from '../../../config/firebase';
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';
import { Button, Icon } from'react-native-elements';

export default function ChatRoom2({route}) {
  const [messages, setMessages] = useState([]);
  const [number, setNumber] = useState(30);
  const [showEarlier, setShowEarlier] = useState(false)

  const{ data } = route.params;

useEffect(() => {
  const itemsRef = query(ref(database, `chats/${data}`), limitToLast(number));

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
    }, [number]);

    useEffect(() => {
      number==messages.length? setShowEarlier(true): setShowEarlier(false);
    }, [messages]);

  
    const add = (message) => { 
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
    return <InputToolbar {...props} placeholder="Escribir mensaje..." containerStyle={{
      borderRadius:15,
    }}/>
  }

  const renderChatFooter = () => {
    return(
      <View style={{height:10}}></View>
    )
}

          
  return (
    <View style={{flex:1,  paddingVertical:10}}>
    <GiftedChat
      maxInputLength={2000}

      renderChatEmpty={()=><DialogLoading/>}

      loadEarlier={showEarlier}
      //infiniteScroll={true}
      //renderLoading={() =>  <DialogLoading/>}
      onLoadEarlier={()=>{setNumber(number+30)}}

      renderLoadEarlier={(props)=><LoadEarlier {...props} label='Cargar mensajes anteriores'/>}

      renderSend={(props)=><Send {...props} alwaysShowSend label='Enviar'/>}

      scrollToBottom={true}
      scrollToBottomComponent={()=><Icon name="angle-double-down" type='font-awesome'/>}
      wrapInSafeArea={false}
      renderChatFooter={renderChatFooter}
      renderInputToolbar={renderInputToolbar} 
      isAnimated={false}
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