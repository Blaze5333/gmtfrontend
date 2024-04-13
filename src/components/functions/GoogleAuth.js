/*eslint-disable*/
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import ShowError from './ShowError'
import { WEB_CLIENT_ID } from '../../assets/config/credentials'
GoogleSignin.configure(
    {
        //381184621184-2l9kndf6k3fkktkhdppafanmiu4cbdsf.apps.googleusercontent.com
        webClientId:WEB_CLIENT_ID,
        //scopes:['email', 'https://www.googleapis.com/auth/contacts.readonly']
    }
)
const googleSignin=async()=>{
    try{
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog:true})
        await GoogleSignin.signOut()
        const {user}=await GoogleSignin.signIn()
       console.log(user)
        return user
      }
   
   catch(err){
    console.log(err)
         ShowError({message:"Google Signin Error"})
   }
    
}
module.exports={googleSignin}