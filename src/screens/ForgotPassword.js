/*eslint-disable*/
import React,{useState} from 'react'
import { ActivityIndicator, Modal, StatusBar, StyleSheet, View } from 'react-native'
import { lightcolors } from '../theme/colors'
import CustomButton from '../components/button/CustomButton'
import CustomText from '../components/CustomText'
import NormalInputs from '../components/inputs/NormalInputs'
import axios from 'axios'
import firestore from '@react-native-firebase/firestore'
import ShowError from '../components/functions/ShowError'
import Loaders from '../components/modal/Loaders'
import { BACKEND_URL } from '../assets/config/credentials'

export default function ForgotPassword({navigation}) {
    const [loader, setloader] = useState(false)
    const sendotp=()=>{
        setloader(true)
       axios.post(`${BACKEND_URL}/generateOtp`,{email}).then((res)=>{
           console.log(res.data)
            if(res.data.error){
                ShowError({message:res.data.message})
            }
            else{
                firestore().collection('otp').add({
                    email,
                    otp:res.data.otp,
                    expiresIn:Date.now()+9*60*1000,
                    used:0
                })
                setloader(false)
                navigation.navigate('otpVerification',{email})
            }
       })
    }
    const [email, setemail] = useState('')
  return (
   <View style={style.screen}>
   <Loaders loader={loader}/>
   
   <View style={style.container}>
   <View>
   <CustomText topic={'Forgot password'} color={lightcolors.text.secondary} fontSize={35} fontWeight={'bold'}/>
    <CustomText topic={'Enter your email address and we’ll send you confirmation code to reset your password'} color={'grey'} fontSize={16} fontWeight={'normal'}/>
    </View>
     <NormalInputs label={'Email Address'} placeholder={'Enter your email'} value={email} setvalue={setemail}/>
   </View>
  <CustomButton onPress={sendotp} title={'Continue'} color={lightcolors.text.primary} backgroundColor={lightcolors.backgroung.secondary}/>
   </View>
  )
}
const style=StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:lightcolors.backgroung.primary,
        paddingTop:StatusBar.currentHeight+30,
        padding:20,
        gap:30
        
    },
    container:{
        gap:25
    }
})