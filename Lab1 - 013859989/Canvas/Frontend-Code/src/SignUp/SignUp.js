import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import logo from './SJSU1.png';

//create the Navbar Component
class SignIn extends Component {
    constructor(props){
        super(props);
        this.sjsuIdChangeHandler = this.sjsuIdChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.SignUpCall = this.SignUpCall.bind(this);
        this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);

        
        this.state={
            selectedfile : null,
            ProfileImage: "",
            ProfileImagePreview: undefined,
        }
        this.state = {  
            data : 0
        }

        this.state = {
            redirect : false
        }
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
            const patternCheck = /^[A-Za-z\s]*$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
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
            }
          }

        //submit Login handler to send a request to the node backend
        SignUpCall = (e) => {

            console.log(e.target.id);
            console.log('check add zala ka book');
             //prevent page from refresh
             e.preventDefault();
             const data = {
                sjsuId : this.state.sjsuId,
                name : this.state.name,
                email : this.state.email,
                password : this.state.password,
                isFaculty : this.state.isFaculty
             }
             console.log(data);
             //set the with credentials to true
             axios.defaults.withCredentials = true;
             //make a post request with the user data
             axios.post('http://localhost:3000/signup',data)
                 .then(response => {
                     console.log("Status Code : ",response);
                     if(response.status === 200){
                         this.setState({
                             data : response.data,
                             redirect : true
                         })
                         console.log("I am in if here");
                     }else{
                         this.setState({
                             authFlag : false
                         })
                         console.log("I am here");
                     }
                 });


         }

         handleChange = (e) => {
            const target = e.target;
            const name = target.name;
            const value = target.value;

                console.log(target.files);
                var profilePhoto = target.files[0];
                var data = new FormData();
                data.append('photos', profilePhoto);
                axios.defaults.withCredentials = true;
                console.log("datasd",data);
                axios.post('http://localhost:3001/uploadprofile', data)
                    .then(response => {
                        if (response.status === 200) {
                            console.log('Profile Photo Name: ', profilePhoto.name);
    
                            //Download image
                            axios.post('http://localhost:3001/downloadprofile/' + profilePhoto.name)
                                .then(response => {
                                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                                    this.setState({
                                        ProfileImage: profilePhoto.name,
                                        ProfileImagePreview: imagePreview
                                    })
    
                                }).catch((err) =>{
                                    if(err){
                                        this.setState({
                                            errorRedirect: true
                                        })
                                    }
                                });
                        }
                    });
            }

            

    render(){
        return(
            <div>
            <div class = "container"  style={{width:'100%'}}>
                <div class="login-form">
                <div class="main-div">
                    <div class="panel">
            <img src={logo} alt="Logo" style={{width:'100%'}}/><br/><br/>
                    <form action="http://127.0.0.1:3000/login" method="post">
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
                              onChange = {this.nameChangeHandler} 
                              type="text" class="form-control" 
                              name="name" 
                              placeholder="Name" 
                              required 
                              autoFocus 
                              autoComplete 
                              pattern="[a-zA-Z]{1-20}"
                            />
                        </div>
                        <br/>
                        <div style={{width: '100%'}} class="form-group">
                            <input 
                              onChange = {this.emailChangeHandler} 
                              type="text" class="form-control" 
                              name="email" 
                              placeholder="Email" 
                              required 
                              autoFocus 
                              autoComplete 
                              pattern="[a-zA-Z0-9]{1-20}"
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
                        <div style={{width: '100%'}} >
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
                        </div><br/>


                        <div className="form-group" style={{width: '100%'}} >
                        <label htmlFor="ProfileImage"><strong>Profile Image : </strong></label><br />
                            <input type="file" 
                            name="ProfileImage" 
                            id="ProfileImage" 
                            className="btn btn-lg photo-upload-btn" 
                            onChange={this.handleChange} 
                            className="btn btn-lg photo-upload-btn" />
                        </div>


                        <br/>
                        <br/>
                        <div style={{width: '100%'}}>
                        {this.renderRedirect()}
                        <button 
                          onClick = {this.SignUpCall} 
                          class="btn btn-success" 
                          type="submit">
                          Sign Up
                        </button>
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

export default SignIn;