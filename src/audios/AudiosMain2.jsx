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


export default function AudiosMain2(){

    const [visible, setVisible]= useState(false);
    const [playing, setPlaying]= useState(false);
    const [info, setInfo]= useState('');
    const [track, setTrack]= useState({title:'', image:'', link:''});

    const [pista, setPista] = useState();

    
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: true, shouldDuckAndroid:true });

    function playing(){
      console.log(sound._onPlaybackStatusUpdate )
    }



    Audio._onPlaybackStatusUpdate = playbackStatus => {
        if (!playbackStatus.isLoaded) {
          
            console.log("not loaded")
          if (playbackStatus.error) {
            console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            // Send Expo team the error on Slack or the forums so we can help you debug!
          }
        } else {
            console.log("loaded")
      
          if (playbackStatus.isPlaying) {
            setInfo("Reproduciendo...")

          } else {
            console.log("paused")
          }
      
          if (playbackStatus.isBuffering) {
            setInfo("Cargando...")
          }
      
          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            console.log("The player has just finished playing and will stop. Maybe you want to play something else")
          }
      

        }
      };

      function pad(n, width, z = 0) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z + n);
      }

      const minutesAndSeconds = (position) => ([
        pad(Math.floor(position / 60), 2),
        pad(position % 60, 2),
      ]);

      const SeekBar = ({
        trackLength,
        currentPosition,
        onSeek,
        onSlidingStart,
      }) => {
        const elapsed = minutesAndSeconds(currentPosition);
        const remaining = minutesAndSeconds(trackLength - currentPosition);
        return (
          <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.text, { color: "black" }]}>
                {elapsed[0] + ":" + elapsed[1]}
              </Text>
              <View style={{ flex: 1 }} />
              <Text style={[styles.text, { width: 40, color: "black" }]}>
                {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
              </Text>
            </View>
            <Slider
              maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
              //onSlidingStart={onSlidingStart}
              onSlidingComplete={onSeek}
              value={currentPosition}
              minimumTrackTintColor={"black"}
              maximumTrackTintColor={"gray"}
              //thumbStyle={styles.thumb}
             // trackStyle={styles.track}
            />
          </View>
        );
      };
      

    
      async function player (audio){

        setInfo("Cargando...")
        const { sound } = await Audio.Sound.createAsync({uri: audio.link}
        );
        setSound(sound);
        await sound.playAsync();

    }

    return(

        <View style={{flex:1}}>

          <Test/>

        {visible==true &&(

                  <ListItem style={{ margin: 2 }} 
                  onPress={() => playi}>
            
                  <Avatar source={{uri: track.image}} />
       
                   <ListItem.Content>
                       <ListItem.Title>{track.title}</ListItem.Title>
                       <ListItem.Subtitle>{info}</ListItem.Subtitle>
                   </ListItem.Content>
       
                    {playing?
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
