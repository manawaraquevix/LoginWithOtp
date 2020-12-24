/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar,} from 'react-native';

import LoginScreen from './src/components/LoginScreen'

const App = () => {
  return (
    <View style={styles.container}>
      <LoginScreen/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
     backgroundColor: '#fafafa',
     
      justifyContent:'center',
      alignItems:'center',
     paddingVertical: 10
},

  
});

export default App;
