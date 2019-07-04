import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import logo from './SJSU1.png';
//import {imageBackground} from 'react-native';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.sjsuIdChangeHandler = this.sjsuIdChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
     //   this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);

        //localstorage

        this.state ={
          isloading :true,
          contacts: []
        }

        this.state = {  
            data : 0
        }

        this.state = {
            redirect : false,
            facultyfnd : false
        }

        this.state = {
            errorlogin : true,
            validity : true
        }
    }
    

        //first Input Value change handler to update state variable with the text entered by the user
        sjsuIdChangeHandler = (e) => {
            const patternCheck = /^[0-9\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                sjsuId : e.target.value
            })
        }
        }

        //Second input Value change handler to update state variable with the text entered by the user
        passwordChangeHandler = (e) => {
            //const patternCheck = /^[0-9\b]+$/;
          //  if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                password : e.target.value
            })
        //    }
        }

        // handleCheckboxInputChange(event) {
        //     const target = event.target;
        //     const value = target.type === 'checkbox' ? target.checked : target.value;
        //     const isFaculty = target.isFaculty;
        
        //     this.setState({
        //       isFaculty: value
        //     });
        // }

        // componentWillUpdate(nextprops,nextstate){
        //     localStorage.setItem('contacts','something');
        // }
        
          renderRedirect = (e) => {
            if ((this.state.redirect && !this.state.facultyfnd) && this.state.validity )  {
              return <Redirect to='/Dashboard' />
            }

            if ((this.state.redirect && this.state.facultyfnd) && this.state.validity)  {
              return <Redirect to='/DashboardFaculty' />
            }
          }

        //submit Login handler to send a request to the node backend
        setRedirect = (e) => {

            console.log(e.target.id);
            console.log('check add zala ka book');
             //prevent page from refresh
             e.preventDefault();
             const data = {
                sjsuId : this.state.sjsuId,
                password : this.state.password
             }
            // localStorage.setItem(key, JSON.stringify(this.state.sjsuId));
             console.log(data);
             //set the with credentials to true
             axios.defaults.withCredentials = true;
             //make a post request with the user data
             axios.post('http://localhost:3000/login',data)
                 .then(response => {
                     console.log("Status Code : ",response);
                     if(response.status === 200){ 
                         this.setState({
                             data : response.data,
                             redirect: response.data[0].finalstatus,
                             facultyfnd : response.data[0].facultyfnd,
                             errorlogin: response.data[0].finalstatus,
                             validity :  response.data[0].pwdvalidity
                         })
                         console.log(response);
                     //    console.log(response.data[0].finalstatus);
                       //  console.log(response.data[0].facultyfnd);
                         //local stoarge set and get ... set is working check get during profile click
                         localStorage.setItem('sjsuid',JSON.stringify (this.state.sjsuId));
                         console.log("testing 992**",+this.state.sjsuId);
                        //  localStorage.getItem('sjsuid') && this.setState({
                        //               contacts: JSON.parse(localStorage.getItem('sjsuid')),
                        //               isloading: false
                    //     });
                       //  console.log(contacts);
                     }else{
    
                         console.log("I am here");
                     }
                 });
         }

    render(){
        const isuser = this.state.errorlogin;
        var isvalid = this.state.validity;
        let redirectVar = null;
        if(!isuser)
        {
          isvalid = true;
        }
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/"/>
        }
        return(
            <div>
            {redirectVar}
            <br/>
                <div class = "container">
                <div class="login-form">
                <div class="main-div">
                    <div class="panel">
                <img src={logo} alt="Logo" style={{width:'100%'}}/><br/><br/>
                    <form action="http://127.0.0.1:3000/Dashboard" method="post">
                        <div style={{width: '100%'}} class="form-group">
                            <input 
                              onChange = {this.sjsuIdChangeHandler} 
                              type="text" 
                              class="form-control" 
                              name="sjsuId" 
                              placeholder="SJSU ID" 
                              required 
                              autoFocus 
                              autoComplete 
                              pattern="[0-9]{1-20}"
                            />
                        </div>
                        <br/>
                        <div style={{width: '100%'}} class="form-group">
                            <input 
                              onChange = {this.passwordChangeHandler} 
                              type="password" 
                              class="form-control" 
                              name="password" 
                              placeholder="Password" 
                              required 
                              autoFocus 
                              autoComplete
                            />
                        </div>
                        <br/>
                        <div style={{width: '100%'}}>
                            {this.renderRedirect()}
                            <button 
                            style={{width: '80%'}}
                              onClick = {this.setRedirect} 
                              class="btn btn-success" 
                              type="submit" >
                              Login
                            </button>
                        </div> 
                        <br/>   
                      <div>
                      { isuser
                        ? null
                        : <p>The SJSU ID that you've entered doesn't match with any account. Sign up for an account.</p>
                      }
                      </div>

                      <div>
                      { isvalid
                        ? null
                        : <p>The Password you entered in not Valid. Please Try Again.</p>
                      }
                      </div>


                    <br/>
                    <div>
                    <div>
                    <ul class="main" style={{width: '100%'}}>
                        <li>
                          <NavLink to="/signup" exact activeStyle={
                            {color: 'blue'}
                          }>
                            Sign Up
                          </NavLink>
                        </li>
                    </ul>
                    </div>
                    </div>
                    </form>
                </div>   
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Navbar;