/*eslint-disable*/
import React,{useState} from 'react'
import { StatusBar, StyleSheet, Text, View,TouchableOpacity, Image, Linking } from 'react-native'
import { lightcolors } from '../theme/colors'
import CustomText from '../components/CustomText'
import NormalInputs from '../components/inputs/NormalInputs'
import SecureInputs from '../components/inputs/SecureInputs'
import CheckBox from '../components/inputs/CheckBox'
import { Link } from '@react-navigation/native'
import CustomButton from '../components/button/CustomButton'
import  axios  from 'axios'
// const docs = require('@googleapis/docs')
import ShowError from '../components/functions/ShowError'
import {googleSignin} from '../components/functions/GoogleAuth'
import {getAccesstoken} from '../components/functions/GetAccessToken'
import firestore from '@react-native-firebase/firestore'
import { createEventInCalendar } from '../components/functions/CreateEvent'
export default function Signup({navigation}) {
    const [googleInfo, setgoogleInfo] = useState({})

    
    const [email, setemail] = useState('')
    const [name, setname] = useState('')
    const [password, setpassword] = useState('')
    const [checked, setchecked] = useState(false)
    const [accesstoken, setaccesstoken] = useState('')
  
    const register=async()=>{
      if(!name || !email || !password){
       await ShowError({message:"Please fill all the field"})
        return
      }
      else if(!checked){
        await ShowError({message:"Please agree with terms and conditions"})
        return
      }
      else{
        const account= await firestore().collection('users').where('email','==',email).get()
        console.log(account.docs[0])
        if(account.docs.length>0){
          await ShowError({message:"Account already exists"})
          return
        }
        await firestore().collection('users').add({
          email,
          name,
          password,
          googleLogin:0
        }).then(async()=>{
           await createEventInCalendar(email,name,navigation)
           
        })
        .catch(async(error) => {
             console.log(error)
            await ShowError({message:"Error in creating account. Please try again later"}) 
            return
            })
      
      }
    }
    const google=async()=>{
      const user=await googleSignin()
      const account= await firestore().collection('users').where('email','==',user.email).get()
      
      if(account.docs.length==0){
        await firestore().collection('users').add({
          email:user.email,
          name:user.name,
          googleLogin:1
        })
      }
      console.log("User",user)
       await createEventInCalendar(user.email,user.name,navigation)
    }
  return (
    <View style={style.screen}>
        <View style={style.container}>
            <CustomText topic={'Create your new\naccount'} color={lightcolors.text.secondary} fontSize={35} fontWeight={'bold'} />
             <CustomText topic={'Create an account to start looking for the food you like'} color={'grey'} fontSize={17} fontWeight={'normal'}/>
             <NormalInputs label={'Email Address'} placeholder={'Enter your email'} value={email} setvalue={setemail} />
             <NormalInputs label={'User Name'} placeholder={'Enter your user name'} value={name} setvalue={setname} />
             <SecureInputs label={'Password'} placeholder={'Enter password'} value={password} setvalue={setpassword}/>
            <View style={{flexDirection:'row',gap:5,width:"100%"}}>
                <CheckBox checked={checked} setchecked={setchecked}/>
                <Text style={{color:lightcolors.text.secondary,fontSize:18,fontWeight:'bold'}}>I Agree with 
                <Link to={'/signup'}><CustomText color={lightcolors.text.tertiary} fontSize={18} fontWeight={'bold'} topic={'Terms of service'}/></Link> and <Link to={'/signup'}><CustomText color={lightcolors.text.tertiary} fontSize={18} fontWeight={'bold'} topic={'Privacy Policy'}/></Link> </Text>
            </View>
            <CustomButton onPress={register} title={'Register'} backgroundColor={lightcolors.backgroung.secondary} color={lightcolors.text.primary} style={{borderRadius:30}}/>
            <View style={style.lineContainer}>
         <View style={style.line}/>
         <CustomText topic={'Or sign in with'} color={"grey"} fontWeight={"normal"} fontSize={18} />
         <View style={style.line}/>
      </View>
      <View style={style.center}>
         <TouchableOpacity onPress={google} style={style.button}>
            <Image style={style.googleicon} source={require('../assets/images/googleIcon.png')}/>
         </TouchableOpacity>
      </View>
      <View style={style.center}>
      <Text style={{color:lightcolors.text.secondary,fontSize:18,fontWeight:'normal'}}>Have an account? <Link to={'/login'}><CustomText color={lightcolors.text.tertiary} fontSize={18} fontWeight={'normal'} topic={'Sign In'}/></Link></Text>
      </View>
        </View>
    </View>
  )
}
const style=StyleSheet.create({
    screen:{
        flex:1,
        paddingTop:StatusBar.currentHeight,
        padding:20,
        // alignItems:"center",
        // justifyContent:"space-evenly",
        backgroundColor:lightcolors.backgroung.primary
    },
    container:{
         gap:10,
         paddingTop:30
    },
    lineContainer:{
        width:"100%",
        padding:20,
        flexDirection:'row',
        gap:4,
        justifyContent:"center",
        alignItems:'center'
    },
    line:{
        height:1.2,
        backgroundColor:"lightgray",
        flex:1
    },
    button:{
        height:55,
        width:55,
         borderRadius:100,
         padding:7,
         borderColor:'lightgray',
         borderWidth:1,
         justifyContent:"center",
         alignItems:'center'
     },
     googleicon:{
         height:30,
         width:30
     },
     center:{
         width:"100%",
         alignItems:"center"
     },
})
//AIzaSyDEfNsj9saiHK5z7VDL3Em8mUfOUeTM8pA