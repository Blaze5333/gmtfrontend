/*eslint-disable*/
import React from 'react'
import { Text } from 'react-native'

export default function CustomText({topic,color,fontSize,fontWeight,customStyle}) {
  return (
    <Text style={[{
        color,
        fontSize,
        fontWeight
    },customStyle]}>{topic}</Text>
  )
}
