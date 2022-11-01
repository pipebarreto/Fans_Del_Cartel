import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Input, Button } from'react-native-elements';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { Icon } from'react-native-elements';



export default function MessageInput ({ onPressSend }) {
  const [message, setMessage] = useState('');

  const submitMessageHandler = () => {
    if (message) {
      onPressSend(message);
      setMessage('');
    }
  };
  

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

    <View style={{paddingTop:10}}>

    <View style={{flexDirection:'row', borderWidth:1, borderRadius:15, minHeight:15, paddingHorizontal:10}}>

    <View style={{flex:16, alignContent:"center"}}>
    <TextInput multiline={true} value={message} onChangeText={text => setMessage(text)} />
    </View>

    <View style={{flex:1,justifyContent:"center"}}>
    <Icon name="send" color ='blue' onPress={submitMessageHandler}/>
    </View>

    </View>

        
    </View>
    </KeyboardAvoidingView>
  );
};


