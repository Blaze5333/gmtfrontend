/*eslint-disable*/
import React from 'react'
import { Image, ImageBackground, ImageBackgroundBase, Modal, StyleSheet,View } from 'react-native'
import { lightcolors } from '../theme/colors'
import CustomText from '../components/CustomText'
import CustomButton from '../components/button/CustomButton'
import SuccessModal from '../components/modal/SuccessModal'

export default function Home({navigation}) {
  return (
   <ImageBackground style={style.screen} source={require('../assets/images/bg1.png')}>
     {/* <Modal transparent style={{flex:1}}>
       <View style={style.container}>
            <View style={style.innercontainer}>
              <Image source={require('../assets/images/success.png')}/>
              <View style={{alignItems:'center',justifyContent:"center"}}>
                <CustomText topic={'Login Successful'} fontWeight={'bold'} fontSize={30} color={lightcolors.text.secondary} />
                <CustomText topic={'An event has been created and the invite has been sent to you on mail.'} customStyle={{textAlign:'center'}} color={'grey'} fontSize={18} fontWeight={'normal'}/>
              </View>
              <CustomButton onPress={()=>{navigation.navigate('login')}} title={'Logout'} backgroundColor={lightcolors.backgroung.secondary} color={lightcolors.text.primary} style={{borderRadius:30}}/>
            </View>
       </View>
     </Modal> */}
     <SuccessModal successmessage={'Login Successful'} buttonTitle={'Logout'} description={'An event has been created and the invite has been sent to you on mail.'} onPress={()=>navigation.navigate('login')}/>
   </ImageBackground>
  )
}
const style=StyleSheet.create({
    screen:{
        flex:1,
    },
    container:{
        flex:1,
        justifyContent:"flex-end"
    },
    innercontainer:{
        width:"100%",
        height:"50%",
        backgroundColor:lightcolors.backgroung.primary,
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        alignItems:"center",
        justifyContent:"space-evenly",
        padding:20
    }
})