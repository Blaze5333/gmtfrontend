/*eslint-disable*/
import React from 'react'
import {ImageBackground, StyleSheet, TouchableOpacity, View,Image, Dimensions} from 'react-native'
import { lightcolors } from '../theme/colors'
import CustomText from './CustomText'
import Pagination from './Pagination'
export default function SplashScreen({navigation,data,scrollX,index,onScroll,id }) {
    const width=Dimensions.get('screen').width
  return (
    <ImageBackground style={{flex:1,width}} source={require('../assets/images/bg1.png')}>
    <View style={[style.screen,{width}]}>
    <View style={style.card}>
        <View style={style.innercontainer} >
        <CustomText customStyle={{textAlign:'center'}} color={lightcolors.text.primary} fontSize={35} fontWeight={'bold'} topic={'We Serve incomparable delicacies'}/>
        <CustomText topic={"All the best restaurants with their top menu waiting for you, they can't wait for your order!!"} color={'white'} fontSize={18} customStyle={{textAlign:'center'}} fontWeight={'normal'}/>
        <Pagination data={data} scrollX={scrollX} index={index} />
        </View>
        <View style={style.bottomContaier}>
        <TouchableOpacity onPress={()=>navigation.navigate('login')}>
        <CustomText topic={'Skip'} color={lightcolors.text.primary} fontWeight={'bold'} fontSize={18}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onScroll(id)}  style={{flexDirection:"row",alignItems:"center",justifyContent:"center",gap:7}}>
        <CustomText topic={'Next'} color={lightcolors.text.primary} fontWeight={'bold'} fontSize={18}/>
        <Image style={style.icon} source={require('../assets/images/next.png')} />
        </TouchableOpacity>
        </View>
        </View>
    </View>
        
    </ImageBackground>
  )
}
const style=StyleSheet.create({
    screen:{
        // flex:1,
        resizeMode:'contain',
        justifyContent:"flex-end",
        alignItems:'center',
        paddingHorizontal:30,
        paddingBottom:20,
        height:"100%",
        width:"100%"
    },
    card:{
        height:"50%",
        width:"100%",
        backgroundColor:lightcolors.backgroung.secondary,
        borderRadius:40,
        padding:20,
       justifyContent:'space-between',
       alignItems:'center'
    //    flexDirection:'column',
    },
    innercontainer:{
        // flex:1,
        justifyContent:'center',
        gap:15
    },
    bottomContaier:{
        flexDirection:"row",
        width:"100%",
        justifyContent:'space-between',
        alignItems:"center"
    },
    nextButton:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:7
    },
    icon:{
        tintColor:'white'
    }
})
