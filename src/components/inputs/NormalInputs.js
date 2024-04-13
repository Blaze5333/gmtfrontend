/*eslint-disable*/
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import CustomText from '../CustomText'
import { lightcolors } from '../../theme/colors'
export default function NormalInputs({label,value,setvalue,placeholder}) {
  return (
    <View style={style.emailInput}>
        <CustomText topic={label} fontSize={20} fontWeight={'bold'} color={lightcolors.text.secondary}/>
        <TextInput  value={value} onChangeText={text=>setvalue(text)} placeholder={placeholder} placeholderTextColor={'grey'} style={style.inputBox} />
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
})
