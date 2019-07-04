import {FETCH_POST,NEW_POST,LOGIN_POST} from './types';
import axios from 'axios';
//import {rooturl} from '../../config/settings';
import {rooturl} from '../../AWS/settings';

export const fetchPost = values => dispatch => {
 //   return function(dispatch){
     console.log("in FETCH function");
     // axios.post('http://'+rooturl+':3000/Dashboard/enroll/details',data)
      axios.post('http://'+rooturl+':3000/signup',values)
        .then(response => {
            console.log("Status Code : ",response);
            if(response.status === 200){
                console.log("I am in if here");
                dispatch( {
                    type: FETCH_POST,
                    payload: response.data
                  });
            }else{
                console.log("I am here in else");
            }
        });
 //   }
}

export const Logindata = values => dispatch =>{
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log("in login data POST");
   // axios.post('http://'+rooturl+':3000/Dashboard/enroll/details',data)
    axios.post('http://'+rooturl+':3000/login',values)
        .then(response => {
            console.log("Status Code : ",response);
            if(response.status === 200){ 
 
              localStorage.setItem("token", response.data.Token);
              console.log(response.data.Token);
              console.log("checking response.");
              console.log(response.data);

              dispatch( {
                type: LOGIN_POST,
                payload: response.data
              });
            }else{

                console.log("I am here");
            }
           // localStorage.setItem('sjsuid',JSON.stringify (this.state.sjsuId));
        });
   }


   export const accountprofile = values => dispatch =>{
    axios.defaults.withCredentials = true;
    //make a post request with the user data
   // console.log
   var token = localStorage.getItem("token");
   // axios.post('http://'+rooturl+':3000/Dashboard/enroll/details',data)
    axios.post('http://'+rooturl+':3000/Dashboard/updateprofile',values, {
        headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(response => {
            console.log("Status Code : ",response);
            if(response.status === 200){
                
            dispatch( {
                type: NEW_POST,
                payload: response.data
              });
        }
        });
   }
