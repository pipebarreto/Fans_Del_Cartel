import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, ListItem, Text } from 'react-native-elements';
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';

export default function Podcast({player}) {
    const [songs, setSongs] = useState([]);
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const url = `https://api.spreaker.com/v2/shows/4131412/episodes`;
          const res = await axios.get(url);
          setSongs(
            res.data.response.items.map((track) => ({
              episode: track.episode_id,
              title:track.title,
              duration: track.duration,
              image: track.image_url,
              play: track.playback_url,
              download: track.download_url
            }))
          );
        } catch (error) {
          console.error(error);
        }
      };
  
      loadData();
    }, []);


    const renderItem = ({ item }) => {
      return (

        <View>

          <ListItem bottomDivider onPress={() => {player({link: item.play, image:item.image, title:item.title, duration: item.duration})}}>
            
           <Avatar source={{uri: item.image}} />
            <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>{Math.round(item.duration/1000/60)} mimutos</ListItem.Subtitle>
            </ListItem.Content>
            

            <ListItem.Chevron  type="material"
                                name="play-circle-outline"/>

          </ListItem>
        </View>);
    }       

    return(
        <View style={{paddingVertical:0}}>

              {/*<Text h5>PODCASTS</Text>*/}

          {songs=='' &&(<DialogLoading/>)}
                    
              <FlatList data={songs} renderItem={renderItem} />
        </View>
    )
  
  }