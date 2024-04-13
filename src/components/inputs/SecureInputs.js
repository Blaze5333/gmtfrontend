/*eslint-disable*/
import React, { useState } from 'react'
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { lightcolors } from '../../theme/colors'
import CustomText from '../CustomText'

export default function SecureInputs({label,value,setvalue,placeholder}) {
    const [hidden, sethidden] = useState(true)
  return (
   <View  style={style.emailInput}>
    <CustomText topic={label} fontSize={20} fontWeight={'bold'} color={lightcolors.text.secondary}/>
    <View style={{flexDirection:"row",alignItems:"center"}}>
    <TextInput value={value} onChangeText={text=>setvalue(text)} secureTextEntry={hidden}  placeholder={placeholder} placeholderTextColor={'grey'} style={style.inputBox} />
    <TouchableOpacity onPress={()=>sethidden(!hidden)} style={{position:"relative", right:35}}>
        {hidden&&<Image style={style.icon}  source={require('../../assets/images/hide.png')}/>}
        {!hidden&&<Image style={style.icon} source={require('../../assets/images/nothidden.png')}/>}
    </TouchableOpacity>
   </View>
   </View>
  )
}
const style=StyleSheet.create({
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
})