/*eslint-disable*/
import React from 'react'
import { Image,  Modal, StyleSheet,View } from 'react-native'
import { lightcolors } from '../../theme/colors'
import CustomText from '../CustomText'
import CustomButton from '../button/CustomButton'
export default function SuccessModal({open=true,successmessage,description,onPress,buttonTitle,customStyle}) {
  return (
     <Modal visible={open}  transparent style={{flex:1}}>
       <View  style={[style.container,customStyle]}>
       <View style={style.innercontainer}>
            <View style={{width:"100%",justifyContent:"center",
            alignItems:"center",paddingTop:20}}>
            <Image style={{width:"30%"}} source={require('../../assets/images/Indicator.png')}/>
           </View>
           <View style={style.innercontainer2} >
           <Image source={require('../../assets/images/success.png')}/>
              <View style={{alignItems:'center',justifyContent:"center"}}>
                <CustomText topic={successmessage} fontWeight={'bold'} fontSize={30} color={lightcolors.text.secondary} />
                <CustomText topic={description} customStyle={{textAlign:'center'}} color={'grey'} fontSize={18} fontWeight={'normal'}/>
              </View>
              <CustomButton onPress={onPress} title={buttonTitle} backgroundColor={lightcolors.backgroung.secondary} color={lightcolors.text.primary} style={{borderRadius:30}}/>
           </View>
              
            </View>
       </View>
     </Modal>
  )
}
const style=StyleSheet.create({
    screen:{
        flex:1,
    },
    container:{
        flex:1,
        justifyContent:"flex-end",
        // backgroundColor:'rgba(0,0,0,0.5)'

        
    },
    innercontainer:{
        width:"100%",
        height:"50%",
        backgroundColor:lightcolors.backgroung.primary,
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        alignItems:"center",
        // justifyContent:"space-evenly",
        padding:20,
        paddingTop:0,
        gap:5
    },
    innercontainer2:{
      alignItems:"center",
      justifyContent:"space-evenly",
      flex:1,
      width:"100%"
    }
})