import React,{Component} from 'react';
//import axios from 'axios';
import {Redirect} from 'react-router';

//create the Navbar Component
class AccountProfile extends Component {
    constructor(props){
        super(props);
        this.sjsuIdChangeHandler = this.sjsuIdChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    //    this.SignUpCall = this.SignUpCall.bind(this);
        this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);
        
        this.state = {  
            checkdata : 0
        }

        this.state = {  
            data : 0
        }

        this.state = {
            redirect : false
        }

        this.state = {  
            data : []
        }
    }

    UNSAFE_componentWillMount() {
        //let data;
        console.log("aa ra kya");
        let checkdata = JSON.parse(localStorage.getItem('name'));
        console.log("check"+checkdata);
      }


        //SJSU ID Value change handler to update state variable with the text entered by the user
        sjsuIdChangeHandler = (e) => {
            const patternCheck = /^[0-9\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                sjsuId : e.target.value
            })
        }
        }

        //Name Value change handler to update state variable with the text entered by the user
        nameChangeHandler = (e) => {
            if(e.target.value === ''){
            this.setState({
                name : e.target.value
            })

        }
        }

        //Email Value change handler to update state variable with the text entered by the user
        emailChangeHandler = (e) => {
            const patternCheck = /^[A-Za-z0-9\s]+@[A-Za-z\s]+.[A-Za-z\s]/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                email : e.target.value
            })
            }
        }

        //Email Value change handler to update state variable with the text entered by the user
        passwordChangeHandler = (e) => {
            // const patternCheck = /^[A-Za-z0-9\s]+@[A-Za-z\s]+.[A-Za-z\s]/;
            // if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                password : e.target.value
            })
       // }
        }

        handleCheckboxInputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
           // const isFaculty = target.isFaculty;
        
            this.setState({
                isFaculty: value
            });
          }


        renderRedirect = (e) => {
            if (this.state.redirect) {
              return <Redirect to='/' />
             // console.log("check here");
            }
          }

        //submit Login handler to send a request to the node backend
        // SignUpCall = (e) => {

        //     console.log(e.target.id);
        //     console.log('check add zala ka book');
        //      //prevent page from refresh
        //      e.preventDefault();
        //      const data = {
        //         sjsuId : this.state.sjsuId,
        //         name : this.state.name,
        //         email : this.state.email,
        //         password : this.state.password,
        //         isFaculty : this.state.isFaculty
        //      }
        //      console.log(data);
        //      //set the with credentials to true
        //      axios.defaults.withCredentials = true;
        //      //make a post request with the user data
        //      axios.post('http://localhost:3000/accountprofile',data)
        //          .then(response => {
        //              console.log("Status Code : ",response);
        //              if(response.status === 200){
        //                  this.setState({
        //                      data : response.data,
        //                      accountprofile : true
        //                  })
        //        //          localStorage.setItem('name',JSON.stringify("dat"));
        //      //            localStorage.setItem('name',JSON.stringify(this.data.emailid));
        //                  console.log("I am in if here");
        //              }else{
        //                  this.setState({
        //                      authFlag : false
        //                  })
        //                  console.log("I am here");
        //              }
        //          });
        //  }

    render(){
        
        return(
            <div>
            <div>
            <h>ala ka </h>
            <h1>{this.state.checkdata}</h1>
        </div>
            <br/>
                <div class = "container">
                    <form action="http://127.0.0.1:3000/login" method="post">
                        <div style={{width: '30%'}} class="form-group">
                           <input 
                             onChange = {this.sjsuIdChangeHandler} 
                             type="text" 
                             class="form-control" 
                             name="sjsuId" 
                             placeholder="SJSU ID" 
                             required 
                             autoFocus 
                             autoComplete 
                            />
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input 
                              type="text" class="form-control" 
                              name="name" 
                              placeholder="Name" 
                              required 
                              autoFocus 
                              autoComplete 
                              value={this.state.checkdata}
                            />
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input 
                              onChange = {this.emailChangeHandler} 
                              type="text" class="form-control" 
                              name="email" 
                              placeholder="Email" 
                              required 
                              autoFocus 
                              autoComplete 
                            />
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input 
                              onChange = {this.passwordChangeHandler} 
                              type="text" 
                              class="form-control" 
                              name="password" 
                              placeholder="Password" 
                              required 
                              autoFocus 
                              autoComplete
                            />
                        </div>
                        <br/>
                        <label>
                            <input
                              name="isFaculty"
                              type="checkbox"
                              checked={this.state.isFaculty}
                              onChange={this.handleCheckboxInputChange} 
                            />
                            &nbsp; 
                            Please click here if you are a Faculty.
                        </label>
                        <br/>
                        <br/>
                        <div style={{width: '30%'}}>
                        {this.renderRedirect()}
                        <button 
                          onClick = {this.SignUpCall} 
                          class="btn btn-success" 
                          type="submit">
                          Edit Details
                        </button>
                      </div> 
                    </form>
                </div>   
            </div>
        )
    }
}

export default AccountProfile;