import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Input, Button, Text, Icon } from'react-native-elements';
import Podcast from "./Podcast";
import Streaming from "./Streaming";
import {Audio} from 'expo-av'
import BannerComponent from "./BannerComponent";
import BannerComponent2 from "./BannerComponent2";


export default function AudiosMain(){

    const [visible, setVisible]= useState(false);
    const audio = React.useRef(null)

    Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: true, playThroughEarpieceAndroid: true, shouldDuckAndroid:true });

    const sound = new Audio.Sound();


    sound._onPlaybackStatusUpdate = playbackStatus => {
        if (!playbackStatus.isLoaded) {
          
            console.log("not loaded")
          if (playbackStatus.error) {
            console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            // Send Expo team the error on Slack or the forums so we can help you debug!
          }
        } else {
            console.log("loaded")
      
          if (playbackStatus.isPlaying) {
            // Update your UI for the playing state
            console.log("playing")
          } else {
            console.log("paused")
          }
      
          if (playbackStatus.isBuffering) {
            console.log("loading...")
          }
      
          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            console.log("The player has just finished playing and will stop. Maybe you want to play something else")
          }
      

        }
      };
      

    
    const player= async (test)=>{  
  
        sound.unloadAsync()
     
        const result = await sound.loadAsync({uri:test.link}, {}, true);

        sound.pauseAsync();
            if (result.isLoaded == false) {
                Alert.alert('Lo sentimos', 'Se ha producido un error cargando el audio. Intentélo nuevamente');
             } else {
                if (result.isPlaying == false) {
                    sound.playAsync();
                
                  }else{
                    sound.pauseAsync();
                  }
                }
            }


    return(

        <View style={{flex:1}}>

        {visible==false &&(
        <BannerComponent />)}

        <Streaming player={player}/>

       <Podcast player={player}/>
       </View>

    )
 

}


      /*     Audio.Sound.createAsync(
            { uri: test },
            { shouldPlay: true }
          );*/
