import {FETCH_POST,NEW_POST,LOGIN_POST} from '../actions/types';

const intitialState = {
    items :[],
    userid : [],
    item : {}
}

export default function(state = intitialState,action){
    switch(action.type){
    case FETCH_POST :
       console.log("in FETCH_POST");
       console.log(action.payload);
       //console.log(action.payload[0].finalstatus);
       //console.log(action.payload.finalstatus);
       return{
           ...state,
           data : action.payload.data,
           items: action.payload.data
          //redirect:true
          //  data : action.payload,
                            //  redirect: action.payload[0].finalstatus,
                            //  facultyfnd : action.payload[0].facultyfnd,
                            //  errorlogin: action.payload[0].finalstatus,
                            //  validity :  action.payload[0].pwdvalidity
       }
       case LOGIN_POST :
       console.log("in LOGIN_POST");
       console.log(action.payload);
       return{
           ...state,
        //    items: action.payload[0].pwdvalidity,
        //    data : action.payload,
        //    redirect: action.payload[0].finalstatus,
        //    facultyfnd : action.payload[0].facultyfnd,
        //    errorlogin: action.payload[0].finalstatus,
        //    validity :  action.payload[0].pwdvalidity,
        userid: action.payload.logincheck[0].facultyfnd,
        final: action.payload.logincheck[0].finalstatus,
        items: action.payload.logincheck[0].pwdvalidity,
        red : action.payload.logincheck[0].finalstatus
       }
       case NEW_POST :
       console.log("in NEW_POST");
       console.log(action.payload);
       return{
           ...state,
           items: action.payload
       }
    default:
      return state;
    }
}