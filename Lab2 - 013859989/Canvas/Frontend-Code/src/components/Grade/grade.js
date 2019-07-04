

import React, { Component } from "react";
import {Redirect} from 'react-router';
import { Document, Page } from "react-pdf";
import axios from 'axios';
import {rooturl} from '../../AWS/settings';
//import Pdf from '/Users/sachinwaghmode/Desktop/Lab2 - 013859989/Canvas/Backend-Code/uploads/cmpe273_lab2_Canvas.pdf';
import Pdf from '/Users/sachinwaghmode/Desktop/Lab2 - 013859989/Canvas/Frontend-Code/src/components/Grade/1.pdf';
//import Pdf from '/home/ec2-user/ProfPaulandShimCommit/Lab2 - 013859989/Canvas/Frontend-Code/src/components/Grade/1.pdf';

//         <a href = {Pdf} target = "_blank">Download Pdf</a>
export default class grade extends Component {
  state = { numPages: null, pageNumber: 1, check : '/Users/sachinwaghmode/Desktop/Lab2 - 013859989/Canvas/Backend-Code/uploads/cmpe273_lab2_Canvas.pdf' };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
    this.state = {
      redirect : false,
      posts : false,
      grade : false,
      facultyfnd : false
  }
  this.courseidChangeHandler = this.courseidChangeHandler.bind(this);
  this.sjsuChangeHandler = this.sjsuChangeHandler.bind(this);

  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

            //SJSU ID Value change handler to update state variable with the text entered by the user
            courseidChangeHandler = (e) => {
         //     if(e.target.value === '' || patternCheck.test(e.target.value)){
              this.setState({
                  grade : e.target.value
              })
          //}
          }

              //SJSU ID Value change handler to update state variable with the text entered by the user
              sjsuChangeHandler = (e) => {
                const patternCheck = /^[0-9\b]+$/;
                if(e.target.value === '' || patternCheck.test(e.target.value)){
                this.setState({
                    sjsuId : e.target.value
                })
            }
            }



    renderRedirect = (e) => {

      console.log("checking in redirect grade for further process.");

      if (this.props.redirect==true) //&& this.props.facultyfnd==false) && this.props.validity==true )  {
      {
        return <Redirect to='/Dashboard' />

      }

      // if ((this.props.redirect==true && this.props.facultyfnd==true) && this.props.validity==true)  {

      //   return <Redirect to='/DashboardFaculty' />
      // }
    }

        //submit Login handler to send a request to the node backend
        CourseCreationCall = (e) => {

          console.log(e.target.id);
         // console.log('check add zala ka book');
           //prevent page from refresh
           e.preventDefault();
           const data = {
              sjsuId : this.state.sjsuId,
              grade : this.state.grade
           }
           console.log(data);
       //    this.props.fetchPost1(data);
           //set the with credentials to true
            axios.defaults.withCredentials = true;
          //  //make a post request with the user data
          var token = localStorage.getItem("token");
          console.log(token);
          //axios.post('http://'+rooturl+':3000/Dashboard/enroll/details',data)
           axios.post('http://'+rooturl+':3000/DashboardFaculty/grade',data, {
            headers: {"Authorization" : `Bearer ${token}`}
            })
               .then(response => {
                   console.log("Status Code : ",response);
                   if(response.status === 200){
                       this.setState({
                           data : response.data,
                           redirect : true
                       })
                       localStorage.setItem('courseid',JSON.stringify (this.state.courseid));
                       console.log("testing this.state.courseid",+this.state.courseid);
                       if(this.state.redirect)
                         alert("Grade Submitted Successfully !!");
                       console.log("I am in if here");
                   }else{
                       this.setState({
                           authFlag : false
                       })
                       console.log("I am here");
                   }
               });
       }


  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
      <a href = {Pdf}   target = "_blank">Download Pdf</a>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>



        <div style={{ width: 600 }}>
          <Document
            file={Pdf}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>

          <div style={{width: '30%'}} class="form-group">
          <input 
          //  onChange = {this.coruseinfoChangeHandler} 
          onChange = {this.courseidChangeHandler} 
            type="text" 
            class="form-control" 
            name="coruseinfo" 
            placeholder="Enter Grade" 
            required 
            autoFocus 
            autoComplete 
           /></div>   
           <div style={{width: '30%'}} class="form-group">
           <input 
           //  onChange = {this.coruseinfoChangeHandler} 
           onChange = {this.sjsuChangeHandler} 
             type="text" 
             class="form-control" 
             name="coruseinfo" 
             placeholder="Enter SJSU Id" 
             required 
             autoFocus 
             autoComplete 
            /></div>                      
           <div style={{width: '30%'}}>
                         {this.renderRedirect()}
                            <button 
                            style={{width: '80%'}}
                              onClick = {this.CourseCreationCall} 
                              class="btn btn-success" 
                              type="submit" >
                              Submit Grade
                            </button>
                        </div> 
        
          <p>
          Page {pageNumber} of {numPages}
        </p>
        </div>


      </div>
    );
  }
}

//export default grade;
