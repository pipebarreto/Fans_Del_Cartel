import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Button, Text  } from 'react-native-elements';
import { Card, Input} from'react-native-elements';

export default function Explorer() {
    const [result, setResult] = useState(null);

    const _handlePressButtonAsync = async () => {

      let result = await WebBrowser.openBrowserAsync('https://expo.dev');
      setResult(result);
    };
    return (
      <View>
        <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
        <Text>{result && JSON.stringify(result)}</Text>
      </View>
    );
  }