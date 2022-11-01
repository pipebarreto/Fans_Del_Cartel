import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Banner, Button, TextInput } from "react-native-paper";
//import { Icon } from "@rneui/themed";
import { Icon } from'react-native-elements';
import { Image } from 'react-native'
  
const BannerComponent = () => {
    const [visible, setVisible] = useState(true);

  
    return (
        <View>
            <Banner
                visible={visible}
                actions={[
                    {  icon: <Icon name="send" color ='blue' />, onPress: () => setVisible(false) },
                    {
                        label: "Proceed",
                        onPress: () => {
                            setVisible(false);
                            setEmail("");
                            setPhone("");
                            Alert.alert("Thanks for your Confirmation");
                        },
                    },
                    
                ]}

                icon={({size}) => (
                    <Image
                      source={{
                        uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
                      }}
                      style={{
                        width: size,
                        height: size,
                      }}
                    />
                  )}>
                
            
                {<Icon name="send" color ='blue' />}
            </Banner>
  

        </View>
    );
};
  
export default BannerComponent;
  
const styles = StyleSheet.create({
    input: {
        margin: 20,
    },
});