/*eslint-disable*/
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { lightcolors } from '../../theme/colors'

export default function CheckBox({checked,setchecked}) {
  return (
   <TouchableOpacity style={style.button} onPress={()=>setchecked(!checked)}>
     {checked&&<Image style={style.icon} source={require('../../assets/images/tick.png')}/>}
   </TouchableOpacity>
  )
}
const style=StyleSheet.create({
    button:{
        height:24,
        width:24,
        borderRadius:5,
        backgroundColor:lightcolors.backgroung.secondary,
        padding:2,
        justifyContent:"center",
        alignItems:"center"
    },
    icon:{
        height:15,
        width:18
    }
})
