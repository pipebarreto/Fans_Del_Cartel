import React, { useState } from "react";
import { View, Alert, SliderBase } from "react-native";
import { Input, Button, Text, Icon, ListItem, Avatar, Divider } from'react-native-elements';
import Podcast from "./Podcast";
import Streaming from "./Streaming";
import {Audio} from 'expo-av'

import {  StyleSheet,Image,  TouchableOpacity,} from 'react-native';
import Slider from '@react-native-community/slider';



export default function AudiosMain(audios) {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: true, shouldDuckAndroid:true });

    const [visible, setVisible] = useState(false);
    const [track, setTrack] = useState();
    const [sound, setSound] = useState();
    const [info, setInfo] = useState('');
    const [playing, setPlaying] = useState(false);

    const [length, setLength] = useState(0);
    const [along, setAlong] = useState(0);

    React.useEffect(() => {
        return sound? () => {
              console.log('Unloading Sound');
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);

      function playStop(){
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
            setVisible(false);
          if (playbackStatus.error) {
            Alert(`Lo sentimos. Ha ocurrido un error. : ${playbackStatus.error}`);
            setVisible(false);
          }
        } else {
          setVisible(true);
          if (playbackStatus.isPlaying) {
            setInfo("Reproduciendo...")
            setPlaying(true);
            
            setAlong(playbackStatus.positionMillis/playbackStatus.durationMillis);
          } else {
            setInfo("Pausa")
          }
      
          if (playbackStatus.isBuffering) {
            setInfo("Cargando...");
            setLength(playbackStatus.durationMillis);
          }
      
          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            console.log("The player has just finished playing and will stop. Maybe you want to play something else")
          }

        }
      };}

  
    async function player(audios) {
        setTrack(audios);
      const { sound } = await Audio.Sound.createAsync({uri:audios.link});
      setSound(sound);
      sound.playAsync()
    }
    
  
    return(

        <View style={{flex:1, backgroundColor:"white"}}>

        {visible==true &&(

          <View>
          <ListItem
          /*onPress={() => playStop()}*/>      

          <Avatar source={{uri: track.image}} />

            <ListItem.Content>
                <ListItem.Title>{track.title}</ListItem.Title>      
                <ListItem.Subtitle>{info}</ListItem.Subtitle>
            </ListItem.Content>

          { /* {!playing?
            <ListItem.Chevron type="material"
                              size={"large"}
                                color={"black"}
                                name="play-arrow"
                                style={{padding:20}}/>:
                              
                                <ListItem.Chevron type="material"
                                color={"black"}
                                name="pause"
          style={{padding:20}}/>}  */}

          </ListItem>
      {//    <Text/>
      }
          <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>

          <View style={{flex:1/3}}>
          <Button type="clear" icon={{ name: "rewind-15", type:'material-community', color:'#150050', size:25}}
            buttonStyle={{borderRadius: 0, backgroundColor:'white'}}
           onPress={()=> sound.setPositionAsync((along*length)-15000)}/>

          </View>
          <View style={{flex:1/3}}>
          {!playing?
          <Button type="clear" icon={{name:"play-circle", type:'material-community', color:'#150050', size:50}}
          buttonStyle={{borderRadius: 50, backgroundColor:'white'}}
          onPress={()=> playStop()}/>:

          <Button type="clear" icon={{name:"pause-circle", type:'material-community', color:'#150050', size:50}}
          buttonStyle={{borderRadius: 50, backgroundColor:'white'}}
          onPress={()=> playStop()}/>}  
          </View>

          <View style={{flex:1/3}}>     
          <Button type="clear" size="sm" icon={{name:"fast-forward-30", type:'material-community', color:'#150050', size:25}}
          buttonStyle={{borderRadius: 0, backgroundColor:'white'}}
           onPress={()=> sound.setPositionAsync((along*length)+30000)}/>
          </View>


          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal:5}}>
          <View style={{flex:0.5}}> 
          <Text>{Math.floor((along*length/1000)/60,0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{
              Math.floor((along*length/1000)%60,0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} </Text>
          </View>

          <View style={{flex:0.5, position: 'absolute', right:0}}>
          <Text >{Math.floor((length/1000)/60,0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{
              Math.floor((length/1000)%60,0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} </Text>
            </View>

          </View>


          <Slider  style={{marginHorizontal:10}} value={along}  thumbTintColor={'black'}
                        maximumTrackTintColor={'#A2D2FF'}
                        minimumTrackTintColor={'#150050'}  onSlidingComplete={ (someValue) => 
          //onValueChange
             {
              sound.setPositionAsync(someValue*length);
             }}/>

          <Text/>
          <Text/>
          <Divider/>

          </View>

          
          )}

        {visible==false &&(
        <Text/>)}

        <Streaming player={player}/>
        <Divider/>
        
        <View style={{flex:1}}>
        <Podcast player={player}/>
       </View>
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

