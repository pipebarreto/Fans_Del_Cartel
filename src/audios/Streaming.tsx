import { Avatar, Card, ListItem, Text } from 'react-native-elements';
import React from 'react';
import { View, Image} from 'react-native';


export default function Streaming ({player}) {

    return(

        <View>

          {/*<Text h5>AUDIO EN VIVO</Text>*/}

          <ListItem style={{ margin: 20 }} onPress={() => {player({
            link:"http://26593.live.streamtheworld.com:3690/LA_MEGA_BOGAAC.aac", 
            image:"https://files.lamega.com.rcnra-dev.com/assets/public/custom/rcnradiocross-footer/logos/logofooter.png",
            title:"LA MEGA BOGOTÁ - EN VIVO"})}} >
            
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

