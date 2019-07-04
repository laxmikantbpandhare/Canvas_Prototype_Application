import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Enroll extends Component {

    constructor(props) {
        super(props);
        this.state = {
          redirect : false,
          redirectenrollment : false
      }
      this.state = {
        courses : []
    }
      this.toggle = this.toggle.bind(this);
      this.state = {
        dropdownOpen: false
      };
      this.coruseinfoChangeHandler = this.coruseinfoChangeHandler.bind(this);

      this.state = {  
        books : []
    }
    }
  //   //get the books data from backend  
  //   componentDidMount(){
  //     axios.post('http://localhost:3000/Dashboard/enroll/details')
  //             .then((response) => {
  //             //update the state with the response data
  //             this.setState({
  //                 books : this.state.books.concat(response.data) 
  //             });

  //           console.log("here");
  //         });
  // }

            //bookID change handler to update state variable with the text entered by the user
            coruseinfoChangeHandler = (e) => {
              this.setState({
                  courseinfo : e.target.value
              })
          }
  
    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
      }
     
      renderRedirect = (e) => {
        if (this.state.redirect) {
          return <Redirect to='/Dashboard/enroll/details' />
        }
      }

      renderenrollment = (e) => {
        if (this.state.redirectenrollment) {
          return <Redirect to='/Dashboard' />
        }
      }

        //submit Login handler to send a request to the node backend
        SignUpCall = (e) => {

          console.log(e.target.id);
          console.log('check add zala ka book');
           //prevent page from refresh
           e.preventDefault();
           const data = {
              courseInfo : this.state.courseinfo
           }
           console.log(data);
           //set the with credentials to true
           axios.defaults.withCredentials = true;
           //make a post request with the user data
           axios.post('http://localhost:3000/Dashboard/enroll/details',data)
               .then(response => {
                   console.log("Status Code : ",response);
                   if(response.status === 200){
                       this.setState({
                           data : response.data,
                           redirect : true,
                           courses : response.data,
                           books : this.state.books.concat(response.data)        
                       })
                       console.log("Courses"+response.data);
                       console.log("books"+this.state.books);
                       console.log("I am in if here");
                   }else{
                       this.setState({
                           authFlag : false
                       })
                       console.log("I am here");
                   }
               });
       }


  //submit Login handler to send a request to the node backend
  enrollstudent = (param,param1,param2) => (e) => {

    console.log(param);//jamal ho jamal
    var contsa = JSON.parse(localStorage.getItem('sjsuid'));
    console.log(contsa);
    console.log('check add zalsddsa ka book');
     //prevent page from refresh
     e.preventDefault();
     const data = {
       // courseInfo : this.state.courseinfo,
        courseid : param,
        coursedept : param1,
        coursename : param2,
        sjsuId : contsa
     }
     console.log(data);
     //set the with credentials to true
     axios.defaults.withCredentials = true;
     //make a post request with the user data
     axios.post('http://localhost:3000/Dashboard/enroll/enrollstudent',data)
         .then(response => {
             console.log("Status Code : ",response);
             if(response.status === 200){
                 this.setState({
                     data : response.data,
                     redirectenrollment : true,
                     courses : response.data//,
              //       books : this.state.books.concat(response.data)        
                 })
                 console.log("Courses"+response.data);
                 console.log("books"+this.state.books);
                 console.log("I am in if here");
                 if(this.state.redirectenrollment)
                    alert("Course Enrolled Successfully !!");
             }else{
                 this.setState({
                     authFlag : false
                 })
                 console.log("I am here");
             }
         });
 }


    render(){

        //iterate over books to create a table row
        let details = [];
        details = this.state.books.map(book => {
          return(
              <tr>
                  <td>{book.coursedept}</td>
                  <td>{book.courseid}</td>
                  <td>{book.coursename}</td>
                  <div style={{width: '30%'}}>
                  {this.renderenrollment()}
                  <button 
                    onClick = {this.enrollstudent(book.courseid,book.coursedept,book.coursename)} 
                    class="btn btn-success" 
                    name="buttonId"
                    value="check"
                    type="submit">
                    Enroll
                  </button>&nbsp; &nbsp; &nbsp;
                  </div>
              </tr>
          )
      })

                      //if not logged in go to login page
                      let redirectVar = null
                      if(cookie.load('cookie')){
                          redirectVar = <Redirect to= "/"/>
                      }

       return(
        
        <div>
        {redirectVar}
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Search Course
        </DropdownToggle>
        <DropdownMenu>
          <div>
          {this.renderRedirect()}
          <DropdownItem onClick = {this.SignUpCall} >Term</DropdownItem>
          </div><br/>
          <DropdownItem>Course Id</DropdownItem><br/><br/>
          <DropdownItem>Course Name</DropdownItem><br/>
        </DropdownMenu>
      </Dropdown>


        <br/>
        <br/>
        <div style={{width: '30%'}}>
        {this.renderRedirect()}
        <button 
        onClick = {this.SignUpCall} 
        class="btn btn-success" 
        type="submit">
        Term
      </button>&nbsp; &nbsp; &nbsp;

   
      {this.renderRedirect()}
      <button 
        onClick = {this.SignUpCall} 
        class="btn btn-success" 
        type="submit">
        Course Id
      </button>&nbsp; &nbsp; &nbsp;


    {this.renderRedirect()}
    <button 
      onClick = {this.SignUpCall} 
      class="btn btn-success" 
      type="submit">
      Course Name
    </button>
  </div> 
  <br/><br/>
  <div style={{width: '30%'}} class="form-group">
  <input 
    onChange = {this.coruseinfoChangeHandler} 
    type="text" 
    class="form-control" 
    name="coruseinfo" 
    placeholder="Enter Course details" 
    required 
    autoFocus 
    autoComplete 
   />
</div>

<div class="container">
<h2>List of All Courses</h2>
 <br/>
    <table class="table">
        <thead>
            <tr>
                <th>CourseTerm</th>
                <th>Course Id</th>
                <th>Course Name</th>
            </tr>
        </thead>
        <tbody>
            {/*Display the Tbale row based on data recieved*/}
            {details}
        </tbody>
    </table>
</div> 
  </div>

        
        
        
       )
    }
}

export default Enroll;