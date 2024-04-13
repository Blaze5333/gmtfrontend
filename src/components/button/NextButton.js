/*eslint-disable*/
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { lightcolors } from '../../theme/colors'

export default function NextButton({navigation}) {
  return (
   <View style={style.circle}>
      <TouchableOpacity onPress={()=>navigation.navigate('login')} style={style.button}>
          <Image style={style.icon} source={require('../../assets/images/arrow.js.png')}/>
      </TouchableOpacity>
   </View>
  )
}
const style=StyleSheet.create({
    circle:{
        flex:1,
        aspectRatio:1,
        // backgroundColor:lightcolors.backgroung.primary,
        borderRadius:100,
        borderWidth:3,
        borderTopColor:'#feb3005d',
        borderBottomColor:lightcolors.backgroung.primary,
        borderRightColor:lightcolors.backgroung.primary,
        borderLeftColor:lightcolors.backgroung.secondary,

        padding:15,
        transform:[{rotate:'-45deg'}],
    },
    button:{
        flex:1,
        borderRadius:100,
        aspectRatio:1,
        backgroundColor:lightcolors.backgroung.primary,
        alignItems:'center',
        justifyContent:'center',
        transform:[{rotate:'45deg'}],
    },
    icon:{
         height:23,
         width:25
    }
})