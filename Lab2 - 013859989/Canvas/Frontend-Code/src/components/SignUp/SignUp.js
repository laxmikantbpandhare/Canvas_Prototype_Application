// import React,{Component} from 'react';
// import axios from 'axios';
// import {Redirect} from 'react-router';
// import logo from './SJSU1.png';
// import { connect } from "react-redux";
// import { fetchPost } from "../actions/postActions";
// import PropTypes from 'prop-types';
// //import SignUp from '../components/SignUp/SignUp';
// //import {rooturl} from '../../config/settings';
// import {rooturl} from '../../AWS/settings';

// //create the Navbar Component
// class SignUp extends Component {
//     constructor(props){
//         super(props);
//         this.sjsuIdChangeHandler = this.sjsuIdChangeHandler.bind(this);
//         this.nameChangeHandler = this.nameChangeHandler.bind(this);
//         this.emailChangeHandler = this.emailChangeHandler.bind(this);
//         this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
//         this.SignUpCall = this.SignUpCall.bind(this);
//         this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);

        
//         this.state={
//             selectedfile : null,
//             ProfileImage: "",
//             ProfileImagePreview: undefined,
//         }
//         this.state = {  
//             data : 0,
//             posts : false
//         }

//         this.state = {
//             redirect : false
//         }
//     }

//       //Define component that you wanbt to render
//   renderField(field) {
//     const { meta: { touched, error } } = field;
//     const className = `form-group ${touched && error ? "has-danger" : ""}`;

//     return (
//       <div className={className}>
//         <label>{field.label}</label>
//         <input className="form-control" type="text" {...field.input} />
//         <div className="text-help">
//           {touched ? error : ""}
//         </div>
//       </div>
//     );
//   }

//         //SJSU ID Value change handler to update state variable with the text entered by the user
//         sjsuIdChangeHandler = (e) => {
//             const patternCheck = /^[0-9\b]+$/;
//             if(e.target.value === '' || patternCheck.test(e.target.value)){
//             this.setState({
//                 sjsuId : e.target.value
//             })
//         }
//         }

//         //Name Value change handler to update state variable with the text entered by the user
//         nameChangeHandler = (e) => {
//             const patternCheck = /^[A-Za-z\s]*$/;
//             if(e.target.value === '' || patternCheck.test(e.target.value)){
//             this.setState({
//                 name : e.target.value
//             })

//         }
//         }

//         //Email Value change handler to update state variable with the text entered by the user
//         emailChangeHandler = (e) => {
//             const patternCheck = /^[A-Za-z0-9\s]+@[A-Za-z\s]+.[A-Za-z\s]/;
//             if(e.target.value === '' || patternCheck.test(e.target.value)){
//             this.setState({
//                 email : e.target.value
//             })
//             }
//         }

//         //Email Value change handler to update state variable with the text entered by the user
//         passwordChangeHandler = (e) => {
//             // const patternCheck = /^[A-Za-z0-9\s]+@[A-Za-z\s]+.[A-Za-z\s]/;
//             // if(e.target.value === '' || patternCheck.test(e.target.value)){
//             this.setState({
//                 password : e.target.value
//             })
//        // }
//         }

//         handleCheckboxInputChange(event) {
//             const target = event.target;
//             const value = target.type === 'checkbox' ? target.checked : target.value;
//            // const isFaculty = target.isFaculty;
        
//             this.setState({
//                 isFaculty: value
//             });
//           }


//         renderRedirect = (e) => {
//             console.log("checking bABA")
//             if (!this.props.posts) {
//               return <Redirect to='/' />
//             }
//           }

//         //submit Login handler to send a request to the node backend
//         SignUpCall = (e) => {

//             console.log(e.target.id);
//             console.log('check add zala ka book');
//              //prevent page from refresh
//              e.preventDefault();
//              const data = {
//                 sjsuId : this.state.sjsuId,
//                 name : this.state.name,
//                 email : this.state.email,
//                 password : this.state.password,
//                 isFaculty : this.state.isFaculty
//              }
//              this.props.fetchPost(data);
//              console.log("check kar ithe yetoy ka vapas");
//             //  console.log(data);
//             //  //set the with credentials to true
//             //  axios.defaults.withCredentials = true;
//             //  //make a post request with the user data
//             //  axios.post('http://localhost:3000/signup',data)
//             //      .then(response => {
//             //          console.log("Status Code : ",response);
//             //          if(response.status === 200){
//             //              this.setState({
//             //                  data : response.data,
//             //                  redirect : true
//             //              })
//             //              console.log("I am in if here");
//             //          }else{
//             //              this.setState({
//             //                  authFlag : false
//             //              })
//             //              console.log("I am here");
//             //          }
//             //      });


//          }

//          componentWillReceiveProps(nextProps){
//             // console.log(nextProps.posts);
//          }

//          handleChange = (e) => {
//             const target = e.target;
//             const name = target.name;
//             const value = target.value;

//                 console.log(target.files);
//                 var profilePhoto = target.files[0];
//                 var data = new FormData();
//                 data.append('photos', profilePhoto);
//                 axios.defaults.withCredentials = true;
//                 console.log("datasd",data);
//                 axios.post('http://localhost:3001/uploadprofile', data)
//                     .then(response => {
//                         if (response.status === 200) {
//                             console.log('Profile Photo Name: ', profilePhoto.name);
    
//                             //Download image
//                             axios.post('http://localhost:3001/downloadprofile/' + profilePhoto.name)
//                                 .then(response => {
//                                     let imagePreview = 'data:image/jpg;base64, ' + response.data;
//                                     this.setState({
//                                         ProfileImage: profilePhoto.name,
//                                         ProfileImagePreview: imagePreview
//                                     })
    
//                                 }).catch((err) =>{
//                                     if(err){
//                                         this.setState({
//                                             errorRedirect: true
//                                         })
//                                     }
//                                 });
//                         }
//                     });
//             }

//             // onSubmit(values) {
//             //     console.log(values);
//             //     this.props.createBook(values, () => {
//             //       this.props.history.push("/");
//             //     });
//             //   }

//     render(){
//         const { handleSubmit } = this.props;
//         return(
//             <form onSubmit={this.SignUpCall}>
//             <div>
//             <div class = "container"  style={{width:'100%'}}>
//                 <div class="login-form">
//                 <div class="main-div">
//                     <div class="panel">
//             <img src={logo} alt="Logo" style={{width:'100%'}}/><br/><br/>
//                         <div style={{width: '100%'}} class="form-group">
//                            <input 
//                              onChange = {this.sjsuIdChangeHandler} 
//                        //   component={this.renderField}
//                              type="text" 
//                              class="form-control" 
//                              name="sjsuId" 
//                              placeholder="SJSU ID" 
//                              required 
//                              autoFocus 
//                              autoComplete 
//                              pattern="[0-9]{1-20}"
//                              value={this.state.sjsuId}
//                             />
//                         </div>
//                         <br/>
//                         <div style={{width: '100%'}} class="form-group">
//                             <input 
//                              onChange = {this.nameChangeHandler} 
//                         //      component={this.renderField}
//                               type="text" class="form-control" 
//                               name="name" 
//                               placeholder="Name" 
//                               required 
//                               autoFocus 
//                               autoComplete 
//                               pattern="[a-zA-Z]{1-20}"
//                             />
//                         </div>
//                         <br/>
//                         <div style={{width: '100%'}} class="form-group">
//                             <input 
//                              onChange = {this.emailChangeHandler} 
//                         //component={this.renderField}
//                               type="text" class="form-control" 
//                               name="email" 
//                               placeholder="Email" 
//                               required 
//                               autoFocus 
//                               autoComplete 
//                               pattern="[a-zA-Z0-9]{1-20}"
//                             />
//                         </div>
//                         <br/>
//                         <div style={{width: '100%'}} class="form-group">
//                             <input 
//                              onChange = {this.passwordChangeHandler} 
//                         //   component={this.renderField}
//                               type="password" 
//                               class="form-control" 
//                               name="password" 
//                               placeholder="Password" 
//                               required 
//                               autoFocus 
//                               autoComplete
//                             />
//                         </div>
//                         <br/>
//                         <div style={{width: '100%'}} >
//                         <label>
//                             <input
//                               name="isFaculty"
//                               type="checkbox"
//                               component={this.renderField}
//                               checked={this.state.isFaculty}
//                               onChange={this.handleCheckboxInputChange} 
//                             />
//                             &nbsp; 
//                             Please click here if you are a Faculty.
//                         </label>
//                         </div><br/>


//                         <div className="form-group" style={{width: '100%'}} >
//                         <label htmlFor="ProfileImage"><strong>Profile Image : </strong></label><br />
//                             <input type="file" 
//                             name="ProfileImage" 
//                             id="ProfileImage" 
//                             className="btn btn-lg photo-upload-btn" 
//                             onChange={this.handleChange} 
//                             className="btn btn-lg photo-upload-btn" />
//                         </div>


//                         <br/>
//                         <br/>
//                         <div style={{width: '100%'}}>
//                         {this.renderRedirect()}
//                         <button 
//                   //       onClick = {this.SignUpCall} 
//                           class="btn btn-success" 
//                           type="submit">
//                           Sign Up
//                         </button>
//                       </div> 
//                 </div> 
//                 </div>
//                 </div>
//                 </div>  
//             </div>
//             </form>

            
//         );
//     }
// }

// function validate(values) {

//     const errors = {};
  
//     // Validate the inputs from 'values'
//     if (!values.name) {
//       errors.name = "Enter an name";
//     }
//     // if (!values.Title) {
//     //   errors.Title = "Enter Title";
//     // }
//     // if (!values.Author) {
//     //   errors.Author = "Enter Author";
//     // }
  
//     // If errors is empty, the form is fine to submit
//     // If errors has *any* properties, redux form assumes form is invalid
//     return errors;
//   }

// //   export default reduxForm({
// //     validate,
// //     form: "NewBookForm"
// //   })(connect(null, { createBook })(SignUp));

// SignUp.PropTypes = {
//     fetchPost: PropTypes.func.isRequired,
//     posts: PropTypes.array.isRequired
// }

// const mapStateToProps = state => ({
//    posts: state.posts.items//,
//                         //  this:setState({
//                         //      redirect : state.posts.items
//                         //  })
                    
// }
// );

// export default connect(mapStateToProps,{fetchPost})(SignUp);
// //export default SignUp;

import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import logo from './SJSU1.png';
import { connect } from "react-redux";
import { fetchPost } from "../actions/postActions";
import PropTypes from 'prop-types';
//import SignUp from '../components/SignUp/SignUp';

//create the Navbar Component
class SignUp extends Component {
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
            data : 0,
            posts : false
        }

        this.state = {
            redirect : false
        }
    }

      //Define component that you wanbt to render
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
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
            console.log("checking bABA")
            if (!this.props.posts) {
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
             this.props.fetchPost(data);
             console.log("check kar ithe yetoy ka vapas");
            //  console.log(data);
            //  //set the with credentials to true
            //  axios.defaults.withCredentials = true;
            //  //make a post request with the user data
            //  axios.post('http://localhost:3000/signup',data)
            //      .then(response => {
            //          console.log("Status Code : ",response);
            //          if(response.status === 200){
            //              this.setState({
            //                  data : response.data,
            //                  redirect : true
            //              })
            //              console.log("I am in if here");
            //          }else{
            //              this.setState({
            //                  authFlag : false
            //              })
            //              console.log("I am here");
            //          }
            //      });


         }

         componentWillReceiveProps(nextProps){
            // console.log(nextProps.posts);
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

            // onSubmit(values) {
            //     console.log(values);
            //     this.props.createBook(values, () => {
            //       this.props.history.push("/");
            //     });
            //   }

    render(){
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={this.SignUpCall}>
            <div>
            <div class = "container"  style={{width:'100%'}}>
                <div class="login-form">
                <div class="main-div">
                    <div class="panel">
            <img src={logo} alt="Logo" style={{width:'100%'}}/><br/><br/>
                        <div style={{width: '100%'}} class="form-group">
                           <input 
                             onChange = {this.sjsuIdChangeHandler} 
                       //   component={this.renderField}
                             type="text" 
                             class="form-control" 
                             name="sjsuId" 
                             placeholder="SJSU ID" 
                             required 
                             autoFocus 
                             autoComplete 
                             pattern="[0-9]{1-20}"
                             value={this.state.sjsuId}
                            />
                        </div>
                        <br/>
                        <div style={{width: '100%'}} class="form-group">
                            <input 
                             onChange = {this.nameChangeHandler} 
                        //      component={this.renderField}
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
                        //component={this.renderField}
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
                        //   component={this.renderField}
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
                              component={this.renderField}
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
                  //       onClick = {this.SignUpCall} 
                          class="btn btn-success" 
                          type="submit">
                          Sign Up
                        </button>
                      </div> 
                </div> 
                </div>
                </div>
                </div>  
            </div>
            </form>

            
        );
    }
}

function validate(values) {

    const errors = {};
  
    // Validate the inputs from 'values'
    if (!values.name) {
      errors.name = "Enter an name";
    }
    // if (!values.Title) {
    //   errors.Title = "Enter Title";
    // }
    // if (!values.Author) {
    //   errors.Author = "Enter Author";
    // }
  
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }

//   export default reduxForm({
//     validate,
//     form: "NewBookForm"
//   })(connect(null, { createBook })(SignUp));

SignUp.PropTypes = {
    fetchPost: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
   posts: state.posts.items//,
                        //  this:setState({
                        //      redirect : state.posts.items
                        //  })
                    
}
);

export default connect(mapStateToProps,{fetchPost})(SignUp);
//export default SignUp;