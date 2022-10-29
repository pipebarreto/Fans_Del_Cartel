import React from "react";
import { View } from "react-native";
import { Input, Button, Text } from'react-native-elements';
import Podcast from "./Podcast";
import Streaming from "./Streaming";
import Sound from 'react-native-sound';



export default function AudiosMain(){

    


    return(

        <View style={{flex:1}}>


        <Streaming/>

       <Podcast/>
       </View>

    )
 

}