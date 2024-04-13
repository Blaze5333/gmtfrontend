/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/*eslint-disable*/
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Navigation from './src/navigation'

function App() {
  

  return (
    <SafeAreaView style={{flex:1}} >
      <StatusBar
         translucent
         backgroundColor={'transparent'}
      />
      <Navigation/>
    </SafeAreaView>
  );
}



export default App;
