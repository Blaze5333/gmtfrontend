/*eslint-disable*/
import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'

export default function Loaders({loader}) {
  return (
    <Modal transparent visible={loader} >
    <View style={{flex:1,
       position:"relative",
       justifyContent:'center',alignItems:"center"}}>
       <ActivityIndicator  color={'green'} size={'large'}/>
       </View>
       </Modal>
  )
}
