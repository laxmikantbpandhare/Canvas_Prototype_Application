import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
//import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import logo from './SJSU1.png';
import {login} from '../../queries/queries';
import {withApollo} from 'react-apollo';


//create the Navbar Component
class Login extends Component {
    constructor(props){
        super(props);
        this.sjsuidChangeHandler = this.sjsuidChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.setRedirect = this.setRedirect.bind(this);


        this.state ={
          isloading :true,
          contacts: []
        }

        this.state = {  
            data : 0
        }

        this.state = {
            redirect : false,
            posts : false,
            loginc : false,
            facultyfnd : false
        }

        this.state = {
            errorlogin : null,
            validity : null
        }
    }
    

        //first Input Value change handler to update state variable with the text entered by the user
        sjsuidChangeHandler = (e) => {
       //     const patternCheck = /^[0-9\b]+$/;
         //   if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                sjsuid : e.target.value
            })
      //  }
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

        
 


 

        //submit Login handler to send a request to the node backend
        setRedirect = (e) => {

            console.log(e.target.id);
            console.log('check add zala ka book');
             //prevent page from refresh
             e.preventDefault();
            //  const data = {
            //     sjsuid : this.state.sjsuid,
            //     password : this.state.password
            //  }
             localStorage.setItem('sjsuid',JSON.stringify (this.state.sjsuid));
            // localStorage.setItem(key, JSON.stringify(this.state.sjsuId));
           //  console.log('data',data);
            // this.props.Logindata(data);
            // this.renderRedirect();
       

       // axios.defaults.withCredentials = true;
       

        this.props.client.query({
            query : login,
            variables: {
                sjsuid : this.state.sjsuid,
                password : this.state.password
            }
        }).then((response)=>{
            console.log('Response', response.data)//.login.facultyfnd);
                this.setState({
                    redirect:response.data.login.finalstatus
                });
                this.setState({
                  facultyfnd:response.data.login.facultyfnd
              });
              this.setState({
                validity:response.data.login.pwdvalidity
            });

          });
         }


         renderRedirect = (e) => {

         // console.log("this.state");
         // console.log(this.state);

        if ((this.state.redirect && this.state.facultyfnd)&& this.state.validity )  {
          console.log("Dashboard Faculty  route")
          return <Redirect to='/DashboardFaculty' />

        }

       // if ((this.state.redirect && this.state.facultyfnd) && this.state.validity)  {
        if (this.state.redirect && this.state.validity)  {
          console.log("Dashboard route")
          return <Redirect to='/Dashboard' />
        }
        }

    render(){


        const isuser = this.state.errorlogin;
        //var isvalid = this.props.validity;

        let redirectVar = null;


        // if(this.state.validity === true){
        //   redrirectVar = <Redirect to="/home" />
        // }

        if(isuser===false)
        {
          //isvalid = true;
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
                    <form>
                        <div style={{width: '100%'}} class="form-group">
                            <input 
                              onChange = {this.sjsuidChangeHandler} 
                              type="text" 
                              class="form-control" 
                              name="sjsuid" 
                              placeholder="SJSU ID" 
                              required 
                              autoFocus 
                              autoComplete 
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
                            style={{width: '30%'}}
                              onClick = {this.setRedirect} 
                              class="btn btn-success" 
                              type="submit" >
                              Login
                            </button>
                        </div> 
                        <br/>   
                  {/*}    <div>
                      { isuser
                        ? <p>The SJSU ID that you've entered doesn't match with any account. Sign up for an account.</p>
                        : null
                      }
                      </div>

                      <div>
                      { isvalid
                        ? null
                        : <p>The Password or User Id you entered in not Valid. Please Try Again.</p>
                      }
                    </div>*/}


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


// Login.PropTypes = {
//   accountprofile: PropTypes.func.isRequired,
//   posts: PropTypes.array.isRequired
// }


// const mapStateToProps = state => ({
//   validity : state.posts.items,
//   facultyfnd: state.posts.userid,
//   finalstatus : state.posts.final,
//   errorlogin : state.posts.final,
//   redirect : state.posts.red

// }
// );


//export default Login;

export default withApollo(Login);