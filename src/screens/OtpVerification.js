/*eslint-disable*/
import React,{useState,useEffect} from 'react'
import { ActivityIndicator, AppState, Image, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, requireNativeComponent } from 'react-native'
import { lightcolors } from '../theme/colors'
import CustomText from '../components/CustomText'
import {Link} from '@react-navigation/native'
import CustomButton from '../components/button/CustomButton'
import firestore from '@react-native-firebase/firestore'
import ShowError from '../components/functions/ShowError'
import Loaders from '../components/modal/Loaders'
import { BACKEND_URL } from '../assets/config/credentials'
import axios from 'axios'
import Snackbar from 'react-native-snackbar'
const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}
export default function OtpVerification({navigation,route}) {
  const [remainingSecs, setRemainingSecs] = useState(9*60);
  const [isActive, setIsActive] = useState(true);
  const { mins, secs } = getRemaining(remainingSecs);
  const [loader, setloader] = useState(false)
    const [digit1, setdigit1] = useState('')
    const [digit2, setdigit2] = useState('')
    const [digit3, setdigit3] = useState('')
    const [digit4, setdigit4] = useState('')
    toggle = () => {
      setIsActive(!isActive);
    }
  
    useEffect(() => {
      let interval = null;
      setIsActive(true)
      if (remainingSecs>=0) {
        interval = setInterval(() => {
          console.log(mins,secs)
          setRemainingSecs(remainingSecs => remainingSecs-1);
        }, 1000);
      } else if ( remainingSecs == 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, remainingSecs]);
  
    const verify=async()=>{
        const otp=digit1+digit2+digit3+digit4
        if(otp.length<4){
            alert('Please enter valid otp')
            return
        }
        else{
             firestore().collection('otp').where('email','==',route.params.email).where('otp',"==",otp).get().then((res)=>{
                  if(res.docs.length>0){
                     if(res.docs[0].data().used){
                      ShowError({message:'Otp already used'})
                     }
                     else if(res.docs[0].data().expiresIn<Date.now()){
                        ShowError({message:'Otp expired'})
                     }
                     else{
                          firestore().collection('otp').doc(res.docs[0].id).update({used:1})
                          navigation.navigate('resetPassword',{email:route.params.email})
                      
                     }
                  }
                  else{
                      ShowError({message:'Invalid Otp' })
                  } 
             })
        }
        
    }
    const sendotp=()=>{
     axios.post(`${BACKEND_URL}/generateOtp`,{email:route.params.email}).then((res)=>{
         console.log(res.data)
          if(res.data.error){
              ShowError({message:res.data.message})
          }
          else{
              firestore().collection('otp').add({
                  email:route.params.email,
                  otp:res.data.otp,
                  expiresIn:Date.now()+9*60*1000,
                  used:0
              })
              setRemainingSecs(60*9)
              Snackbar.show({
                text:"Otp sent successfully",
              textColor:"white",
              duration:Snackbar.LENGTH_SHORT,
              backgroundColor:"green"
              })
          }
     })
  }
  return (
   <View style={style.screen}>
    <Loaders loader={loader}/>
     <View style={style.header}>
     <TouchableOpacity onPress={()=>navigation.goBack()} style={style.button}>
       <Image  source={require('../assets/images/backicon.png')}/>
       </TouchableOpacity>
       <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
         <CustomText topic={'OTP'} color={lightcolors.text.secondary} fontWeight={'bold'} fontSize={20}/>
       </View>
     </View>
     <View style={style.middlecontainer}>
     <View style={{gap:15}}>
     <CustomText topic={'Email verification'} color={lightcolors.text.secondary} fontWeight={'bold'} fontSize={35}/>
       <CustomText topic={`Enter the verification code we send you on: ${route.params.email}|`} color={'grey'} fontSize={18} fontWeight={'normal'}/>
     </View>
        <View style={{width:"100%",flexDirection:"row",alignItems:"center",justifyContent:'space-between'}}>
          <TextInput value={digit1} onChangeText={text=>setdigit1(text)} keyboardType='numeric' textAlign='center' maxLength={1} style={style.input}/>
          <TextInput value={digit2} onChangeText={text=>setdigit2(text)} keyboardType='numeric' textAlign='center' maxLength={1} style={style.input}/>
          <TextInput value={digit3} onChangeText={text=>setdigit3(text)} keyboardType='numeric' textAlign='center' maxLength={1} style={style.input}/>
          <TextInput value={digit4} onChangeText={text=>setdigit4(text)} keyboardType='numeric' textAlign='center' maxLength={1} style={style.input}/>
        </View>
        <View style={style.container}>
        <Text style={{color:'grey',fontSize:18,fontWeight:'normal'}}>Didn't recieve code? </Text>
        <TouchableOpacity onPress={sendotp} ><CustomText color={lightcolors.text.tertiary} fontSize={18} fontWeight={'normal'} topic={'Resend'}/></TouchableOpacity>
        </View>
        <View style={style.container}>
          <Image style={style.icon} tintColor={'grey'} source={require('../assets/images/clock.png')} />
          <CustomText topic={`${mins}:${secs}`} color={'grey'} fontWeight={'bold'} fontSize={18}/>
        </View>
          <CustomButton onPress={verify} title={'Continue'} color={lightcolors.text.primary} backgroundColor={lightcolors.backgroung.secondary}/>
     </View>
   </View>
  )
}
const style=StyleSheet.create({
    screen:{
        flex:1,
        paddingTop:StatusBar.currentHeight+20,
        padding:20,
        backgroundColor:lightcolors.backgroung.primary
    },
    header:{
        flexDirection:'row',
        alignItems:"center"
    },
    middlecontainer:{
        paddingTop:20,
        gap:30
    },
    input:{
        width:"23%",
        aspectRatio:1,
        borderColor:'grey',
        borderWidth:0.2,
        maxWidth:150,
        color:lightcolors.text.secondary,
        alignItems:'center',
        justifyContent:"center",
        fontSize:25,
        fontWeight:'bold'
    },
    center:{
        width:"100%",
        alignItems:'center'
    },
    container:{
        flexDirection:'row',
        gap:3,
        alignItems:'center',
        justifyContent:"center"
    },
    icon:{
        height:30,
        width:30
    }
})
