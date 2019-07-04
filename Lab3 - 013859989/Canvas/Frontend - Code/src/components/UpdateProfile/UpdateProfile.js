import React,{Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
//import {rooturl} from '../../config/settings';
import {rooturl} from '../../AWS/settings';
import {graphql,compose} from 'react-apollo';
import {profileUpdateMutation} from '../../queries/queries'



let imgUrl = './abcd.jpg'; 


//create the Navbar Component
class UpdateProfile extends Component {
    constructor(props){
        super(props);
        this.sjsuidChangeHandler = this.sjsuidChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailidChangeHandler = this.emailidChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);

        this.ProfileUpdateCall = this.ProfileUpdateCall.bind(this);
        //this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);

        this.state = {  
            data : 0
        }

        this.state = {
            redirect : false
        }

        this.state = {
          description: '',
          selectedFile: '',
        };
    }





        //SJSU ID Value change handler to update state variable with the text entered by the user
        sjsuidChangeHandler = (e) => {
            const patternCheck = /^[0-9\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                sjsuid : e.target.value
            })
        }
        }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        nameChangeHandler = (e) => {
            this.setState({
                name : e.target.value
            })
       // }
        }
    
        //SJSU ID Value change handler to update state variable with the text entered by the user
        emailidChangeHandler = (e) => {
            const patternCheck = /^[a-zA-Z\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                emailid : e.target.value
            })
        }
        }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        passwordChangeHandler = (e) => {
         //   const patternCheck = /^[a-zA-Z\b]+$/;
        //  if(e.target.value === ''){
        //      console.log("cchhhh")
        //     //if(e.target.value === '' || patternCheck.test(e.target.value)){
        //     this.setState({
        //         password : e.target.value
        //     })
        // }

        this.setState({
            password : e.target.value
        })
        }

       
        renderRedirect = (e) => {
            if (this.state.redirect) {
              return <Redirect to='/Dashboardfaculty' />
            }
          }

        //submit Login handler to send a request to the node backend
        ProfileUpdateCall = (e) => {

            console.log(e.target.id);
            console.log('check add zala ka book');
             e.preventDefault();
             const data = {
                sjsuid : this.state.sjsuid,
                name : this.state.name,
                emailid : this.state.emailid,
                password : this.state.password,
             }
             console.log(data);



            this.props.profileUpdateMutation({
              variables:{
                sjsuid : this.state.sjsuid,
                name : this.state.name,
                emailid : this.state.emailid,
                password : this.state.password,
              }
            }).then((response)=>{
              console.log('Resposne', response.data);
              if(response.data.coursecreation.success === true){

              //  this.renderRedirect()
                  this.setState({
                    redirect : true
                  });
              }
              if(response.data.coursecreation.duplicateUser === true){
                console.log("The Same Course is available !!!");
                  // this.setState({
                  //     isDuplicateUser : true
                  // });
              }
          });
         }

         handleselectedFile = event => {
            // this.setState({
            //   selectedFile: event.target.files[0],
            //   loaded: 0,
            // })
        //    console.log("file", event.target.files[0]);
          }

          handleUpload = () => {
            const data = new FormData()
            data.append(this.state.selectedFile, this.state.selectedFile.name)
            console.log(data);
            //console.log("data" + this.state.selectedFile);
            //axios.post('http://'+rooturl+':3000/Dashboard/enroll/details',data)
            // axios.post('http://'+rooturl+':3000/Dashboard/fileupload', data, {   
            //     onUploadProgress: ProgressEvent => {
            //       this.setState({
            //         loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
            //       })
            //     },
            //   })
            //   .then(res => {
            //     console.log(res.statusText)
            //   })
        
          }

    render(){
        //if not logged in go to login page
   //     const { description, selectedFile } = this.state;
        let redirectVar = null
        console.log(imgUrl);
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
              {redirectVar}
            <br/>
            <div className = 'Component-Bg' 
                style = {{ backgroundImage: 'url(""' + imgUrl + '"")', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
              }}>
            </div>
                <div class = "container">
                <div class="login-form">
                <div class="main-div">
                    <div class="panel">
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
                      pattern="[0-9]{1-20}"
                     />
                 </div>
                        <div style={{width: '100%'}} class="form-group">
                           <input 
                             onChange = {this.nameChangeHandler} 
                             type="text" 
                             class="form-control" 
                             name="name" 
                             placeholder="Name" 
                             required 
                             autoFocus 
                             autoComplete 
                            />
                        </div>

                        <div style={{width: '100%'}} class="form-group">
                        <input 
                          onChange = {this.emailidChangeHandler} 
                          type="text" 
                          class="form-control" 
                          name="emailid" 
                          placeholder="Email ID " 
                          required 
                          autoFocus 
                          autoComplete 
                     //     pattern="[a-zA-Z]{1-20}"
                         />
                     </div>
                     <div style={{width: '100%'}} class="form-group">
                     <input 
                       onChange = {this.passwordChangeHandler} 
                       type="text" 
                       class="form-control" 
                       name="password" 
                       placeholder="Password" 
                       required 
                       autoFocus 
                       autoComplete 
                       //pattern="[a-zA-Z]{1-20}"
                      />
                  </div>
                
                        <br/>
                        <div style={{width: '100%'}}>
                        {this.renderRedirect()}
                        <button 
                          onClick = {this.ProfileUpdateCall} 
                          class="btn btn-success" 
                          type="submit">
                          Update Profile
                        </button>
                      </div> 
                        <br/>
                    </form>
                    
                </div>
                </div>
                </div>
                </div>
            <br/>

            </div>
        )
    }
}



export default compose(
  graphql(profileUpdateMutation,{name:"profileUpdateMutation"})
)(UpdateProfile);