import { Avatar, Card, ListItem } from '@rneui/themed';
import React from 'react';
import { View, Image, Text } from 'react-native';
import {Audio} from 'expo-av'


export default function BannerComponent2 ({player}) {
    
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: true,
        playThroughEarpieceAndroid: true, shouldDuckAndroid:true, allowsRecordingIOS:false});

    return(

        <View>
          <ListItem style={{ margin: 2 }} >
            
           <Avatar source={{uri: "https://files.lamega.com.rcnra-dev.com/assets/public/custom/rcnradiocross-footer/logos/logofooter.png"}} />

            <ListItem.Content>
                <ListItem.Title>LA MEGA BOGOTÁ - EN VIVO</ListItem.Title>
            </ListItem.Content>

            {/* <ListItem.Subtitle style={{ color: "grey" }}>Show on map</ListItem.Subtitle> */}

            <ListItem.Chevron type="material"
                                color={"black"}
                                name="play-arrow"
                                style={{padding:20}}/>

                                <ListItem.Chevron type="material"
                                color={"black"}
                                name="pause"
                                style={{padding:20}}/>



          </ListItem>
        </View>


    )
}

