import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Input, Button, Text, Icon, ListItem, Avatar } from'react-native-elements';
import Podcast from "./Podcast";
import Streaming from "./Streaming";
import {Audio} from 'expo-av'
import BannerComponent from "./BannerComponent";
import BannerComponent2 from "./BannerComponent2";
import  { Component } from 'react';

import {  StyleSheet,Image,  Slider,  TouchableOpacity,} from 'react-native';
import Test from "./Test";


export default function AudiosMain(audios) {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: true, shouldDuckAndroid:true });

    const [visible, setVisible] = useState(false);
    const [track, setTrack] = useState(true);
    const [sound, setSound] = useState();
    const [info, setInfo] = useState('');
    const [playing, setPlaying] = useState(false);

    React.useEffect(() => {
        return sound? () => {
              console.log('Unloading Sound');
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);

      function test(){
        if (playing==true){
            sound.pauseAsync();
            setPlaying(false);
        }else{
            setPlaying(true);
            sound.playAsync();
        }
      }
  


      if (sound==undefined){}else{
      sound._onPlaybackStatusUpdate = playbackStatus => {
        if (!playbackStatus.isLoaded) {      
           // setVisible(false);
          if (playbackStatus.error) {
            console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            // Send Expo team the error on Slack or the forums so we can help you debug!
          }
        } else {
           // setVisible(true);
      
          if (playbackStatus.isPlaying) {
            setInfo("Reproduciendo...")
            setPlaying(true);

          } else {
            setInfo("Pausa")
            console.log("pausa")
          }
      
          if (playbackStatus.isBuffering) {
            setInfo("Cargando...")
          }
      
          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            console.log("The player has just finished playing and will stop. Maybe you want to play something else")
          }
        }
      };}
    
  
    async function player(audios) {

        setVisible(true);
        setTrack(audios);
      const { sound } = await Audio.Sound.createAsync({uri:audios.link});
      setSound(sound);
      await sound.playAsync();
    }
  

    return(

        <View style={{flex:1}}>


        {visible==true &&(

                  <ListItem style={{ margin: 2 }} 
                  onPress={() => test()}>
            
                  <Avatar source={{uri: track.image}} />
       
                   <ListItem.Content>
                       <ListItem.Title>{track.title}</ListItem.Title>
                       <ListItem.Subtitle>{info}</ListItem.Subtitle>
                   </ListItem.Content>
       
                   {!playing?
                   <ListItem.Chevron type="material"
                                       color={"black"}
                                       name="play-arrow"
                                       style={{padding:20}}/>:
                                      
                                       <ListItem.Chevron type="material"
                                       color={"black"}
                                       name="pause"
                                       style={{padding:20}}/>}
       
                 </ListItem>)}

        <Streaming player={player}/>

       <Podcast player={player}/>
       </View>

    )


}

const styles = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign: 'center',
  }
});


      /*     Audio.Sound.createAsync(
            { uri: test },
            { shouldPlay: true }
          );*/
