import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import TrackPlayer from 'react-native-track-player';


export default function Podcast() {
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
          <ListItem style={{ margin: 2 }} onPress={() => {console.log(item.play)}} hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
            
           <Avatar source={{uri: item.image}} />
            <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>

            {/* <ListItem.Subtitle style={{ color: "grey" }}>Show on map</ListItem.Subtitle> */}
            <ListItem.Chevron type="material"
                                name="play-circle-outline"/>

          </ListItem>
        </View>);
    }       

    return(
        <View style={{paddingVertical:10}}>
                    
                    <FlatList data={songs} renderItem={renderItem} />
        </View>
    )
  
  }