/*eslint-disable*/
import Snackbar from 'react-native-snackbar'
export default function ShowError({message}) {
    Snackbar.show({
        text:message,
        textColor:"white",
        duration:Snackbar.LENGTH_SHORT,
        backgroundColor:"red"
    })
}