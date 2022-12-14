import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet} from 'react-native';


export default function BrackgroundGradient({ children }) {

  return(
    
    <LinearGradient style={styles.container} colors={['#7187a4', 'white', 'white','white','white','#7187a4']}>
      {children}
    </LinearGradient>

  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      padding: 5,
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