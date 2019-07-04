import React,{Component} from 'react';
//import {NavLink} from 'react-router-dom';
import axios from 'axios';
//import cookie from 'react-cookies';
import {Redirect} from 'react-router';
//import {imageBackground} from 'react-native';

//create the Navbar Component
class Announcement extends Component {
    constructor(props){
        super(props);
        this.courseidChangeHandler = this.courseidChangeHandler.bind(this);
        this.announcementChangeHandler = this.announcementChangeHandler.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);

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
            //is faculty added for future use
            isFaculty : false,
            errorlogin : true
        }
    }
    

        //first Input Value change handler to update state variable with the text entered by the user
        courseidChangeHandler = (e) => {
            const patternCheck = /^[0-9\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                courseid : e.target.value
            })
        }
        }

        //Second input Value change handler to update state variable with the text entered by the user
        announcementChangeHandler = (e) => {
            //const patternCheck = /^[0-9\b]+$/;
          //  if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
              announcement : e.target.value
            })
        //    }
        }

        handleCheckboxInputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            //const isFaculty = target.isFaculty;
        
            this.setState({
              isFaculty: value
            });
        }

        // componentWillUpdate(nextprops,nextstate){
        //     localStorage.setItem('contacts','something');
        // }
        
          renderRedirect = (e) => {
            if (this.state.redirect) {
              return <Redirect to='/DashboardFaculty' />
            }
          }

        //submit Login handler to send a request to the node backend
        setRedirect = (e) => {

            console.log(e.target.id);
            console.log('check add zala ka book');
            var checkdata = JSON.parse(localStorage.getItem('sjsuid'));
             //prevent page from refresh
             e.preventDefault();
             const data = {
              courseid : this.state.courseid,
              sjsuId : checkdata,
              announcement : this.state.announcement
             }
            // localStorage.setItem(key, JSON.stringify(this.state.sjsuId));
             console.log(data);
             this.state.redirect = true;
             //set the with credentials to true
             axios.defaults.withCredentials = true;
             //make a post request with the user data
             axios.post('http://localhost:3000/DashboardFaculty/announcement',data)
                 .then(response => {
                     console.log("Status Code : ",response);
                     if(response.status === 200){ 
                         this.setState({
                             data : response.data,
                             redirect: response.data
                         })
                         if(this.state.redirect)
                            alert("Announced Successfully !!");
                         console.log(response);
                     }else{
    
                         console.log("I am here");
                     }
                 });
         }

    render(){
       // const isuser = this.state.errorlogin;
       // let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to="/login"/>
        // }
        return(
            <div>
          <div style={{width: '60%'}} class="form-group">  
          <h1>Add Announcement in Below Area :</h1></div>

          <div style={{width: '10%'}} class="form-group">
          <input 
            onChange = {this.courseidChangeHandler} 
            type="text" class="form-control" 
            name="courseid" 
            placeholder="Enter Course Id" 
            required 
            autoFocus 
            autoComplete 
            pattern="[0-9]{1-20}"
          />
          </div>

          <div style={{width: '60%',height:'5%'}} class="form-group">
          <textarea 
            onChange = {this.announcementChangeHandler} 
            type="text" 
            class="form-control" 
            name="announcement" 
            placeholder="Your Announcement Here" 
            rows = '10'
            required 
            autoFocus 
            autoComplete
          />
      </div>

      <div style={{width: '30%'}}>
      {this.renderRedirect()}
      <button 
      onClick = {this.setRedirect} 
        class="btn btn-success" 
        name="buttonId"
        value="check"
        type="submit">
        Announce
      </button>&nbsp; &nbsp; &nbsp;
      </div>

      </div>
      
        )
    }
}

export default Announcement;