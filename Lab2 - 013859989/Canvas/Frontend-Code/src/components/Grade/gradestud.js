import React,{Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import "react-datepicker/dist/react-datepicker.css";
//import {rooturl} from '../../config/settings';
import {rooturl} from '../../AWS/settings';

//create the Navbar Component
class gradestud extends Component {
    constructor(props){
        super(props);


        this.state = {  
            data : 0
        }

        this.state = {
       grade : ""
        };

        this.state = {
            redirect : false
        }

        this.state = {
          description: ''//,
        //  selectedFile: '',
        };

        this.state = {
          endDate: new Date()
        };
    }


        renderRedirect = (e) => {
            if (this.state.redirect) {
              return <Redirect to='/Dashboard' />
            }
          }

          componentDidMount(){

          //  console.log(e.target.id);
            //console.log('check add zala ka book');
             //prevent page from refresh
           //  e.preventDefault();
           var contsa = JSON.parse(localStorage.getItem('sjsuid'));
           const data = {
             sjsuId : contsa
          }
             console.log(data);
             //set the with credentials to true
             axios.defaults.withCredentials = true;
             //make a post request with the user data
             var token = localStorage.getItem("token");
             axios.post('http://'+rooturl+':3000/Dashboard/gradestud',data, {
              headers: {"Authorization" : `Bearer ${token}`}
              })
                 .then(response => {
                     console.log("Status Code : ",response);
                     if(response.status === 200){
                         this.setState({
                             data : response.data,
                             grade : response.data[0].grade
                         })
                         console.log(response.data[0].question1);
                    //     console.log(response.data[1].question1);
                         console.log("testing this.state.courseid",response.data);
                         if(this.state.redirect)
                           alert("Course Created Successfully !!");
                         console.log("I am in if here");
                     }else{
                         this.setState({
                             authFlag : false
                         })
                         console.log("I am here");
                     }
                 });



          }

          
    render(){

        let redirectVar = null
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
              {redirectVar}
            <br/>
              <title>Quiz Create</title>
                <div class = "container">
                    <form>
                    <div><b>The grade You got for your assignment is below : </b></div><br/>
                    <div style={{width: '30%'}} class="form-group">
                    <input 
                      onChange = {this.question1ChangeHandler} 
                      type="text" 
                      class="form-control" 
                      name="question1" 
                      placeholder="Assignment Grade" 
                      value={this.state.grade}
                      required 
                      autoFocus 
                      autoComplete 
                     />
                 </div>
   
                    </form>   
                </div>
            <br/>
            </div>
        )
    }
}
export default gradestud;