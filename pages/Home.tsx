import React from "react";
import { ScrollView, View } from "react-native";
import { Input, Text } from'react-native-elements';
import { Button } from '@rneui/base';
import { Image } from 'react-native-elements';
import { Dimensions } from 'react-native';


export default function Home (){

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


    return(

        <ScrollView>

            <View style={{ alignItems: 'center', padding:25}}>
                <Image source={require('../images/2025.png')} style={{ width: windowWidth / 2, height: windowHeight / 4 }} height={undefined} width={undefined}/>
            </View>

  
        <View style={{paddingHorizontal:15}}>
        <Text h4>Payasiiin! Payasiin! yo soy un Payasiiin! Cuidado con los payasos, porque soy un payasin!</Text>


        
        
       

       </View>

      </ScrollView>
    )
}