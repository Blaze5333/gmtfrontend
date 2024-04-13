/*eslint-disable*/
//1//0g1KK7D5eaXIJCgYIARAAGBASNwF-L9IrOYibgleyfN3sgp8fcAb-duOLePDKU6cnBIICpi1Ft_PuaP74zyC76tuk9dbC4U8c30
import axios from 'axios';
import { CLIENT_SECRET, REFRESH_TOKEN, WEB_CLIENT_ID, } from '../../assets/config/credentials';
let payloadForAccessToken = {
    grant_type: 'refresh_token',
    refresh_token: REFRESH_TOKEN,
    client_id: WEB_CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };
  const getAccesstoken=async()=>{
    console.log('Getting token')
    const data=await axios
    .post(`https://oauth2.googleapis.com/token`, payloadForAccessToken, {
      headers: {
        'Content-Type': 'application/json;',
      },
    })
     return data.data.access_token
}

  module.exports={getAccesstoken}