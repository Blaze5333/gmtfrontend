/*eslint-disable*/
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../components/SplashScreen';
import SplashScr from '../screens/SplashScr';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import ForgotPassword from '../screens/ForgotPassword';
import OtpVerification from '../screens/OtpVerification';
import ResetPassword from '../screens/ResetPassword';
export default function StackNavigation() {
   const Stack=createNativeStackNavigator()
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={{
        headerShown:false
     }}>
        <Stack.Screen name='splashScreen' component={SplashScr}/>
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='signup' component={Signup}/>
        <Stack.Screen name='home' component={Home}/>
        <Stack.Screen name='forgotPassword' component={ForgotPassword}/>
        <Stack.Screen name='otpVerification' component={OtpVerification}/>
        <Stack.Screen name='resetPassword' component={ResetPassword}/>
     </Stack.Navigator>
    </NavigationContainer>
  )
}
