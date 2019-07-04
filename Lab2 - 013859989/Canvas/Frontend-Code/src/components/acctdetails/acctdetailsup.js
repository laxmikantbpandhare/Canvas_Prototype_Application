import React,{Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { accountprofile } from "../actions/postActions";
import PropTypes from 'prop-types';
//import {rooturl} from '../../config/settings';
import {rooturl} from '../../AWS/settings';

//create the Navbar Component
class acctdetailsup extends Component {
    constructor(props){
        super(props);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailidChangeHandler = this.emailidChangeHandler.bind(this);
        this.state = {  
            data : 0
        }


        this.state = {
            redirect : false
        }

        this.state = {
          description: ''
        };
    }

        renderRedirect = (e) => {
            if (this.props.redirect==true) {
              return <Redirect to='/Dashboard' />
            }
          }

          componentWillMount(){

           // console.log(e.target.id);
            console.log('check enroll zala ka book 111');
             //prevent page from refresh
             //e.preventDefault();
                var contsa = JSON.parse(localStorage.getItem('sjsuid'));
                //var contsa = localStorage.getItem('sjsuid');
                console.log(contsa);
             const data = {
                sjsuId : contsa
             }
             console.log("data="+contsa);
             //set the with credentials to true
             axios.defaults.withCredentials = true;
             var token = localStorage.getItem("token");
             //make a post request with the user data
             axios.post('http://'+rooturl+':3000/Dashboard/accountprofile',data, {
              headers: {"Authorization" : `Bearer ${token}`}
              })
               .then(response => {
                     console.log("Status Code : ",response);
                     if(response.status === 200){ 
                         this.setState({
                             data : response.data.name,
                             email : response.data.emailid,
                             sjsuid : response.data.sjsuid,
                             flagcheck : true,
                             accountprofile: false
                         })
                         console.log(data);
                         console.log(response.data.name);
                         localStorage.setItem('name',JSON.stringify(response.data.name));
                         localStorage.setItem('emailid',JSON.stringify(response.data.emailid));
                         console.log("I am in if loop");
                     }else{
                         console.log("I am here");
                     }
                 });


          }


                //submit Login handler to send a request to the node backend
                UpdateCreationCall = (e) => {

                  console.log(e.target.id);
                  var check = e.target.id;
                  console.log(check);
                  console.log('check add zala ka book');
                   //prevent page from refresh
                   e.preventDefault();
                   var contsa = JSON.parse(localStorage.getItem('sjsuid'));
                   const data = {
                    name : this.state.name,
                    emailid : this.state.emailid,
                    sjsuId : contsa
                   }
                   console.log(data);
                   this.props.accountprofile(data);
                   //set the with credentials to true
                  //  axios.defaults.withCredentials = true;
                  //  //make a post request with the user data
                  //  axios.post('http://localhost:3000/Dashboard/updateprofile',data)
                  //      .then(response => {
                  //          console.log("Status Code : ",response);
                  //          if(response.status === 200){
                  //              this.setState({
                  //                  data : response.data
                  //              })
                  //              console.log("testing this.state.courseid", this.state.courseid);
                  //              console.log("check", check);
                  //              if(check=="true"){
                  //                console.log("ala re ala");
                  //                 this.setState({
                  //                   redirect : true
                  //                 })  
                  //               }
                  //              else{
                  //               console.log("ala rfe ala");
                  //              this.setState({
                  //               redirect : false
                  //             }) 
                  //           }console.log(this.state.redirect)
                  //              if(this.state.redirect)
                  //                alert("User Details Updated Successful!!");
                  //              console.log("I am in if here");
                  //          }else{
                  //              this.setState({
                  //                  authFlag : false
                  //              })
                  //              console.log("I am here");
                  //          }
                  //      });
               }


                       //SJSU ID Value change handler to update state variable with the text entered by the user
        nameChangeHandler = (e) => {
          this.setState({
              name : e.target.value
          })
        }


                  //SJSU ID Value change handler to update state variable with the text entered by the user
        emailidChangeHandler = (e) => {
          this.setState({
              emailid : e.target.value
          })
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
              <title>Account Details</title>
                <div class = "container">
                    <form>



                  <div style={{width: '30%'}} class="form-group">  
                  <br/>                    
                  <input 
                    type="text" class="form-control" 
                    name="sjsuid" 
                    placeholder="sjsuid" 
                    required 
                    autoFocus 
                    autoComplete 
                    value={this.state.sjsuid}
                  /><br/><br/>
                  </div>
  

                    <div style={{width: '30%'}} class="form-group">                  
                    <input 
                      type="text" class="form-control" 
                      name="name" 
                      placeholder="Name" 
                      required 
                      autoFocus 
                      autoComplete 
                      onChange = {this.nameChangeHandler} 
                 //     onChange={(e)=>this.props.onChange(e.target.value)}
                 //     onBlur={()=>this.props.actions.updateInput}
                  //    value={this.state.data}
                    /><br/><br/>
                    </div>

                    <div style={{width: '30%'}} class="form-group">                        
                    <input 
                      type="text" class="form-control" 
                      name="emailid" 
                      placeholder="Email Id" 
                      required 
                      autoFocus 
                      autoComplete 
                      value={this.state.emailid}
                      onChange = {this.emailidChangeHandler}           
                //      value={this.state.email}
                    /><br/>

                  </div>

                    {this.renderRedirect()}
                    <button 
                     onClick = {this.UpdateCreationCall} 
                      class="btn btn-success" 
                      type="submit">
                      Submit Details
                    </button>
                      <br/>

                    </form>   
                </div>
            <br/>
            </div>
        )
    }
}



acctdetailsup.PropTypes = {
  accountprofile: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  redirect : state.posts.items
  //,
                       //  this:setState({
                       //      redirect : state.posts.items
                       //  })
}
);

export default connect(mapStateToProps,{accountprofile})(acctdetailsup);
//export default acctdetailsup;