/*eslint-disable*/
import React,{useState} from 'react'
import { StatusBar, StyleSheet, TextInput, TouchableOpacity, View,Image, Text, Linking } from 'react-native'
import CustomText from '../components/CustomText'
import { lightcolors } from '../theme/colors'
import { Link } from '@react-navigation/native'
import CustomButton from '../components/button/CustomButton'
import NormalInputs from '../components/inputs/NormalInputs'
import SecureInputs from '../components/inputs/SecureInputs'
import ShowError from '../components/functions/ShowError'
import firestore from '@react-native-firebase/firestore'
import {createEventInCalendar} from '../components/functions/CreateEvent'
import {googleSignin} from '../components/functions/GoogleAuth'
export default function Login({navigation}) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const login=async()=>{
        if(!email || !password){
            await ShowError({message:"Please fill all the field"})
             return
        }
           else{
             const account=await firestore().collection('users').where('email','==',email).get()
             console.log(account.docs[0].data())
             if(account.docs.length>0){
              if(account.docs[0].data().googleLogin){
                await ShowError({message:"Please login with google"})
                return
              }
              else{
                if(account.docs[0].data().password===password){
                  console.log('Yes')
                      createEventInCalendar(email,account.docs[0].data().name,navigation)
                }
                else{
                  await ShowError({message:"Incorrect password"})
                 
                }
              }
             }
             else{
                await ShowError({message:"Account does not exists.Please regiter first"})
                
                return
             }
            }
  }
  const googleLogin=async()=>{
    const user=await googleSignin()
  
      const account= await firestore().collection('users').where('email','==',user.email).get()
      
      if(account.docs.length==0){
        await firestore().collection('users').add({
          email:user.email,
          name:user.name,
          googleLogin:1
        })
     
      }
      else if(account.docs[0].data().googleLogin==0){
        await ShowError({message:"Please login with email"})
        
        return
      }
      console.log("User",user)
       await createEventInCalendar(user.email,user.name,navigation)
  }
  return (
    <View style={style.screen}>
    {/* <Loaders loader={loader}/> */}
        <View style={style.container}>
           <CustomText topic={'Login to your\naccount'} color={'black'} fontWeight={'bold'} fontSize={35}/>
           <CustomText topic={"Please sign in to your account"} color={'grey'} fontWeight={'normal'} fontSize={16} />
              <NormalInputs label={'Email Address'} placeholder={'Enter your email'} value={email} setvalue={setemail}/>
                 <SecureInputs label={'Password'} placeholder={'Enter your password'} value={password} setvalue={setpassword}/>
                 <View style={style.end}>
                   <Link to={'/forgotPassword'}><CustomText color={lightcolors.text.tertiary} fontSize={18} fontWeight={'bold'} topic={'Forgot password?'}/></Link>
                 </View>
                 <CustomButton onPress={login} title={'Sign In'} color={lightcolors.text.primary} backgroundColor={lightcolors.backgroung.secondary} style={{borderRadius:30}} />
             
              <View style={style.lineContainer}>
         <View style={style.line}/>
         <CustomText topic={'Or sign in with'} color={"grey"} fontWeight={"normal"} fontSize={18} />
         <View style={style.line}/>
      </View>
      <View style={style.center}>
         <TouchableOpacity onPress={googleLogin} style={style.button}>
            <Image style={style.googleicon} source={require('../assets/images/googleIcon.png')}/>
         </TouchableOpacity>
      </View>
      <View style={style.center}>
      <Text style={{color:lightcolors.text.secondary,fontSize:18,fontWeight:'normal'}}>Don't have an account? <Link to={'/signup'}><CustomText color={lightcolors.text.tertiary} fontSize={18} fontWeight={'normal'} topic={'Register'}/></Link></Text>
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
        justifyContent:"space-evenly",
        backgroundColor:lightcolors.backgroung.primary
    },
    container:{
        flex:1,
        gap:10,
        paddingTop:30,
    },
    emailInput:{
        gap:15,

    },
    inputBox:{
        width:"100%",
        height:60,
        padding:15,
        borderRadius:10,
        borderColor:'lightgray',
        borderWidth:1,
        color:'black',
        fontSize:16
    },
    icon:{
        height:20,
        width:20
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
    end:{
        width:"100%",
        alignItems:"flex-end"
    }
})