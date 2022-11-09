import React, { useState } from "react";
import { View, Alert, SliderBase } from "react-native";
import { Input, Button, Text, Icon, ListItem, Avatar, Divider } from'react-native-elements';
import Podcast from "./Podcast";
import Streaming from "./Streaming";
import {Audio} from 'expo-av'

import {  StyleSheet,Image,  TouchableOpacity,} from 'react-native';
import Slider from '@react-native-community/slider';



export default function AudiosMain3(audios) {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: true, shouldDuckAndroid:true });

     const [sound, setSound] = useState();

    React.useEffect(() => {
        return sound? () => {
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
            let duration=() =>{ return playbackStatus.durationMillis}
          }
      
          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            console.log("The player has just finished playing and will stop. Maybe you want to play something else")
          }

          if (playbackStatus.durationMillis==undefined){
            setStream(true)}else{
              setStream(false)
            }
          }
        }
      };

  
    async function player(audios) {
      setInfo("Cargando nueva piesta...")
      const { sound } = await Audio.Sound.createAsync({uri:audios.link});
      setSound(sound);
      setTrack(audios);
      await sound.playAsync();
    //  setTrack(audios);

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
          </ListItem>
      {//    <Text/>
      }
          <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>

          {!stream && (
          <View style={{flex:1/3}}>
          <Button type="clear" icon={{ name: "rewind-15", type:'material-community', color:'#150050', size:25}}
            buttonStyle={{borderRadius: 0, backgroundColor:'white'}}
           onPress={()=> sound.setPositionAsync((along*length)-15000)}/>
          </View>)}

          <View style={!stream? {flex:1/3}: {flex:1}}>
          {!playing?
          <Button type="clear" icon={{name:"play-circle", type:'material-community', color:'#150050', size:50}}
          buttonStyle={{borderRadius: 50, backgroundColor:'white'}}
          onPress={()=> playStop()}/>:

          <Button type="clear" icon={{name:"pause-circle", type:'material-community', color:'#150050', size:50}}
          buttonStyle={{borderRadius: 50, backgroundColor:'white'}}
          onPress={()=> playStop()}/>}  
          </View>

          {!stream && (
          <View style={{flex:1/3}}>     
          <Button type="clear" size="sm" icon={{name:"fast-forward-30", type:'material-community', color:'#150050', size:25}}
          buttonStyle={{borderRadius: 0, backgroundColor:'white'}}
           onPress={()=> sound.setPositionAsync((along*length)+30000)}/>
          </View>)}


          </View>

            {!stream && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal:5}}>
          <View style={{flex:0.5}}> 
          <Text>{Math.floor((along*length/1000)/60,0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{
              Math.floor((along*length/1000)%60,0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} </Text>
          </View>

          <View style={{flex:0.5, position: 'absolute', right:0}}>
          <Text >{Math.floor((length/1000)/60,0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{
              Math.floor((length/1000)%60,0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} </Text>
            </View>

          </View>)}

          {!stream && (
          <Slider  style={{marginHorizontal:10}} value={along}  thumbTintColor={'black'}
                        maximumTrackTintColor={'#A2D2FF'}
                        minimumTrackTintColor={'#150050'}  onSlidingComplete={ async (someValue) => 
          //onValueChange
          //onSlidingComplete
             {
              await sound.setPositionAsync(someValue*length);
             }}/>)}

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

