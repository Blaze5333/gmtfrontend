/*eslint-disable*/
import React,{useState} from 'react'
import { Image, Modal, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import { lightcolors } from '../theme/colors'
import CustomText from '../components/CustomText'
import SecureInputs from '../components/inputs/SecureInputs'
import CustomButton from '../components/button/CustomButton'
import SuccessModal from '../components/modal/SuccessModal'
import ShowError from '../components/functions/ShowError'
import firestore from '@react-native-firebase/firestore'
export default function ResetPassword({navigation,route}) {
    const [password, setpassword] = useState('')
    const [confimPass, setconfimPass] = useState('')
    const [openModal, setopenModal] = useState(false)
    const [loader, setloader] = useState(second)
    const verifyAccount=async()=>{
        if(password.length<8){
            ShowError({message:"Password must be at least 8 character"})
            return
        }
        else if(password!==confimPass){
            ShowError({message:"Both passwords must match"})
            return
        }
        else{
           await firestore().collection('users').where('email',"==",route.params.email).get().then((res)=>{
            firestore().collection('users').doc(res.docs[0].id).update({password}).then(()=>{
                setpassword('')
                setconfimPass('')
                setopenModal(true)
            }).catch(()=>{
              ShowError({message:"Error in changing password"})
            })
           })
        }
        
    }
  return (
    <View style={style.screen}>
    <SuccessModal
        successmessage={'Password Changed'}
        description={'Password changed successfully, you can login again with a new password'}
        buttonTitle={'Go To Login'}
        onPress={()=>{navigation.navigate('login')}}
        customStyle={{backgroundColor:'rgba(0,0,0,0.5)'}}
        open={openModal}
    />
       <View style={style.header}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image style={style.icon} source={require('../assets/images/backicon.png')}/>
              </TouchableOpacity>
              <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <CustomText topic={'Reset Password'} fontSize={20} fontWeight={'bold'} color={lightcolors.text.secondary}/>
              </View>
       </View>
       <View style={style.middleContainer}>
          <View style={gap(15).dist}>
            <CustomText topic={'Reset Password'} fontWeight={'bold'} color={lightcolors.text.secondary} fontSize={35}/>
            <CustomText topic={`Your new password must be different from the previously used password`} fontWeight={'normal'} color={'grey'} fontSize={18}/>  
          </View>
       <View style={gap(10).dist}>
         <SecureInputs value={password} setvalue={setpassword} label={'New Password'} placeholder={'Enter password'}  />
         {password.length<9&&<CustomText topic={'Password must be at least 8 character'} color={'grey'} fontSize={16} fontWeight={'normal'}/>} 
       </View>
       <View style={gap(10).dist}>
         <SecureInputs value={confimPass} setvalue={setconfimPass} label={'Confirm Password'} placeholder={'Enter password'}  />
         {password!==confimPass&&<CustomText topic={'Both passwords must match'} color={'grey'} fontSize={16} fontWeight={'normal'}/>} 
       </View>
       </View>
        <View style={style.endcontainer}>
            <CustomButton onPress={verifyAccount} color={lightcolors.text.primary} backgroundColor={lightcolors.backgroung.secondary} title={'Verify Account'} />
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
        flexDirection:"row",
        alignItems:"center",
        width:"100%"
    },
    middleContainer:{
        flex:1,
        gap:20,
        paddingTop:15
    },
    endcontainer:{
        flex:1,
        justifyContent:"flex-end",
},
modal:{
    flex:1,
}
})
const gap=(gap)=>StyleSheet.create({
    dist:{
        gap
    }
})
