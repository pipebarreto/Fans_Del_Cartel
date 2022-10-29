import { Avatar, Card, ListItem } from '@rneui/themed';
import React from 'react';
import { View, Image, Text } from 'react-native';


export default function Streaming () {


    return(

        <View>
          <ListItem style={{ margin: 2 }} onPress={() => console.log("http://26593.live.streamtheworld.com:3690/LA_MEGA_BOGAAC.aac")} hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
            
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

