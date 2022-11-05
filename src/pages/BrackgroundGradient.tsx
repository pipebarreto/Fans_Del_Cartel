import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet, Image, Dimensions } from 'react-native';


export default function BrackgroundGradient({ children }) {

  return(

    <LinearGradient style={styles.container} colors={['#4c669f', '#3b5998', '#192f6a']}>
      {children}
    </LinearGradient>

  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      padding: 10,

  },
  buttonStyle: {
      borderRadius: 10,
     // backgroundColor: '#150050',

  },
  linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },

});