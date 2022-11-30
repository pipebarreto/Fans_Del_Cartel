import React, { useState} from "react";
import { View, Alert, SliderBase } from "react-native";
import { Button, Text, Icon, ListItem, Avatar, Divider } from'react-native-elements';
import Podcast from "./Podcast";
import Streaming from "./Streaming";
import {Audio} from 'expo-av'

import {  StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';


export default function AudiosMain() {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: true, shouldDuckAndroid:true });

    const [visible, setVisible] = useState(false);
    const [track, setTrack] = useState({image:''});
    const [sound, setSound] = useState();
    const [loading, setLoading] = useState(false);

    const [playing, setPlaying] = useState(true);

    const [length, setLength] = useState(1);
    const [along, setAlong] = useState(0);
    const [stream, setStream] = useState(true);

    React.useEffect(() => {
        return sound? () => {
              sound.unloadAsync();
              setVisible(false);
            }
          : undefined;
      }, [sound]);

      async function playStop(){
        if (playing==true){
            await sound.pauseAsync();
            setPlaying(false);
        }else{
          await sound.playAsync();
            setPlaying(true);
        }
      }


      if (sound!=undefined){
      sound._onPlaybackStatusUpdate = playbackStatus => {
        if (!playbackStatus.isLoaded) {    
           
          if (playbackStatus.error) {

            console.log("error");
            Alert(`Lo sentimos. Ha ocurrido un error. : ${playbackStatus.error}`);

          }
        } else {
          if (playbackStatus.isPlaying) {
           // setInfo("Reproduciendo...")
           // console.log(playbackStatus.isPlaying)
            if(playbackStatus.durationMillis){
            setAlong(playbackStatus.positionMillis);
            }

          } else {
            //setInfo("Pausa")
            //setPlaying(false);
           
          }
      
          if (playbackStatus.isBuffering) {
            //setInfo("Cargando...");
            setLoading(false);
            setVisible(true)
            if(playbackStatus.durationMillis){
            setLength(playbackStatus.durationMillis);
            }else{
              setLength(0);
              setAlong(0);
            }

          }


          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            setPlaying(false);
       //     setVisible(false);
            console.log("The player has just finished playing and will stop. Maybe you want to play something else")
          }

          }
        }
      };

  
    async function player(audios) {
      setSound();
      setLoading(true);
      //setTrack({title:"Cargando...", image:''});
      if (audios.stream==true){
        setStream(true)
      }else{setStream(false)}
      
      const { sound } = await Audio.Sound.createAsync({uri:audios.link});
      setSound(sound);
      setTrack(audios);
      await sound.playAsync();
      setPlaying(true);
    }

    const goalon = Math.floor(along/60000).toLocaleString('en-US', {minimumIntegerDigits: 2})+":"+
      Math.floor((along/1000)%60).toLocaleString('en-US', {minimumIntegerDigits: 2});
    
      
      async function seek(number) {
        await sound.setPositionAsync(along+number);
        const position = await sound.getStatusAsync();
        setAlong(position.positionMillis)
      }

    return(

        <View style={{flex:1, backgroundColor:"white"}}>

        <Streaming player={player}/>
        <Divider/>
        
        <View style={{flex:1}}>
        <Podcast player={player}/>
       </View>

       {loading &&(
        <DialogLoading/> 
       )}

            {visible &&(

      <View style={{backgroundColor:'yellow'}}>

        
        <View style={{marginBottom:-10}}>
      <ListItem containerStyle={{backgroundColor:'yellow'}}
      /*onPress={() => playStop()}*/>      

      <Avatar source={{uri: track.image}} />

        <ListItem.Content >
            <ListItem.Title>{track.title}</ListItem.Title>      
      {/*}                <ListItem.Subtitle>{info}</ListItem.Subtitle>*/}
        </ListItem.Content>
      </ListItem>
      </View>
      
      
      <View style={stream?{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between',marginBottom:20}:
        { flexDirection: 'row', alignItems:'center', justifyContent:'space-between',marginBottom:-10}}>

      {!stream && (
      <View style={{flex:1/3}}>
      <Button type="clear" icon={{ name: "rewind-15", type:'material-community', color:'#150050', size:30}}
        buttonStyle={{borderRadius: 0, backgroundColor:'yellow'}}
      onPress={async ()=> await seek(-15000)}/>
      </View>)}

      <View style={!stream? {flex:1/3}: {flex:1}}>
      {!playing ?
      <Button type="clear" icon={{name:"play-circle", type:'material-community', color:'#150050', size:50}}
      buttonStyle={{borderRadius: 50, backgroundColor:'yellow'}}
      onPress={()=> playStop()}/>: 

      <Button type="clear" icon={{name:"pause-circle", type:'material-community', color:'#150050', size:50}}
      buttonStyle={{borderRadius: 50, backgroundColor:'yellow'}}
      onPress={()=> playStop()}/>}
      </View>

      {!stream && (
      <View style={{flex:1/3}}>     
      <Button type="clear" size="sm" icon={{name:"fast-forward-30", type:'material-community', color:'#150050', size:30}}
      buttonStyle={{borderRadius: 0, backgroundColor:'yellow'}}
      onPress={async ()=> await seek(30000)}/>
      </View>)}


      </View>

        {!stream && (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal:5}}>
      <View style={{flex:0.5}}> 
      <Text>{goalon} </Text>
      </View>

      <View style={{flex:0.5, position: 'absolute', right:0}}>
      <Text >{Math.floor((length/1000)/60,0).toLocaleString('en-US', {minimumIntegerDigits: 2})}:{
          Math.floor((length/1000)%60,0).toLocaleString('en-US', {minimumIntegerDigits: 2})} </Text>
        </View>

      </View>)}

      {!stream && (
      <Slider  style={{marginHorizontal:10}} minimumValue={0} maximumValue={length} value={along}  thumbTintColor={'black'}
                    maximumTrackTintColor={'#A2D2FF'}
                    minimumTrackTintColor={'#150050'}  onSlidingComplete={ async (someValue) => 
      //onValueChange
      //onSlidingComplete
        {
          await sound.setPositionAsync(someValue);
        }}/>)}


      </View>


      )}
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

