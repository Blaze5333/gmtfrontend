/*eslint-disable*/
import axios from 'axios';
import {getAccesstoken} from './GetAccessToken'
import ShowError from './ShowError';

const createEventInCalendar = async (email,name,navigation) => {
  const token =await getAccesstoken()
  console.log("token",token)
   console.log("date",new Date(Date.now()).toISOString())
     try {
       // console.log("acctokeen",data)
       const eventDetails = {
         summary: `${name} Login Event`,
         
         start: {
           dateTime: new Date(Date.now()).toISOString(),
           timeZone:'UTC',
         },
         end: {
           dateTime: new Date(Date.now()+10*60*1000).toISOString(),
           timeZone: 'UTC',
         },
         description: 'Event Description',
         attendees: [
           { email },
           // Add more attendees if needed
         ],
       };
       console.log(eventDetails)
   const response = await axios.post(
     'https://www.googleapis.com/calendar/v3/calendars/primary/events',
     eventDetails,
     {
       headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
       },
     }
   );
   console.log("Yess event created")
   console.log('Event Created:', response.data);
   navigation.navigate('home')
     } catch (error) {
       await ShowError({message:"Error in creating event"})
       console.log(error)
     }
   };
   module.exports={createEventInCalendar}