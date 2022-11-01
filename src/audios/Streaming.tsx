import { Avatar, Card, ListItem } from '@rneui/themed';
import React from 'react';
import { View, Image, Text } from 'react-native';
import {Audio} from 'expo-av'


export default function Streaming ({player}) {
    
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: true,
        playThroughEarpieceAndroid: true, shouldDuckAndroid:true, allowsRecordingIOS:false});

    return(

        <View>
          <ListItem style={{ margin: 2 }} onPress={() => {player({link:"http://26593.live.streamtheworld.com:3690/LA_MEGA_BOGAAC.aac", 
            image:"https://files.lamega.com.rcnra-dev.com/assets/public/custom/rcnradiocross-footer/logos/logofooter.png",
            title:"LA MEGA BOGOTÁ - EN VIVO"})}} hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
            
           <Avatar source={{uri: "https://files.lamega.com.rcnra-dev.com/assets/public/custom/rcnradiocross-footer/logos/logofooter.png"}} />
            <ListItem.Content>
                <ListItem.Title>LA MEGA BOGOTÁ - EN VIVO</ListItem.Title>
            </ListItem.Content>

            {/* <ListItem.Subtitle style={{ color: "grey" }}>Show on map</ListItem.Subtitle> */}
            <ListItem.Chevron type="material"
                                name="play-circle-outline"/>

          </ListItem>
        </View>


    )
}

