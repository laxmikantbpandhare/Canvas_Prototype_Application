import React,{Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
//import {rooturl} from '../../config/settings';
import {rooturl} from '../../AWS/settings';
import {graphql,compose} from 'react-apollo';
import {coursecreationMutation} from '../../queries/queries'



let imgUrl = './abcd.jpg'; 


//create the Navbar Component
class CourseCreation extends Component {
    constructor(props){
        super(props);
        this.courseidChangeHandler = this.courseidChangeHandler.bind(this);
        this.coursenameChangeHandler = this.coursenameChangeHandler.bind(this);
        this.coursedeptChangeHandler = this.coursedeptChangeHandler.bind(this);
        this.coursedescChangeHandler = this.coursedescChangeHandler.bind(this);
        this.courseroomChangeHandler = this.courseroomChangeHandler.bind(this);
        this.coursecapacityChangeHandler = this.coursecapacityChangeHandler.bind(this);
        this.coursewaitlistChangeHandler = this.coursewaitlistChangeHandler.bind(this);
        this.coursetermChangeHandler = this.coursetermChangeHandler.bind(this);
        this.CourseCreationCall = this.CourseCreationCall.bind(this);
        this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);

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

    onChange = (e) => {
      switch (e.target.name) {
        case 'selectedFile':
          this.setState({ selectedFile: e.target.files[0] });
          break;
        default:
          this.setState({ [e.target.name]: e.target.value });
      }
    }

    onSubmit = (e) => {
      e.preventDefault();
      const { description, selectedFile } = this.state;
      let formData = new FormData();

      formData.append('description', description);
      formData.append('selectedFile', selectedFile);
       //axios.post('http://'+rooturl+':3000/Dashboard/enroll/details',data)
      axios.post('http://'+rooturl+':3000/Dashboard/fileupload', formData)
        .then((result) => {
          // access results...
        });
    }


        //SJSU ID Value change handler to update state variable with the text entered by the user
        courseidChangeHandler = (e) => {
            const patternCheck = /^[0-9\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                courseid : e.target.value
            })
        }
        }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        coursenameChangeHandler = (e) => {
            this.setState({
                coursename : e.target.value
            })
       // }
        }
    
        //SJSU ID Value change handler to update state variable with the text entered by the user
        coursedeptChangeHandler = (e) => {
            const patternCheck = /^[a-zA-Z\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                coursedept : e.target.value
            })
        }
        }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        coursedescChangeHandler = (e) => {
         //   const patternCheck = /^[a-zA-Z\b]+$/;
        //  if(e.target.value === ''){
        //      console.log("cchhhh")
        //     //if(e.target.value === '' || patternCheck.test(e.target.value)){
        //     this.setState({
        //         coursedesc : e.target.value
        //     })
        // }

        this.setState({
            coursedesc : e.target.value
        })
        }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        courseroomChangeHandler = (e) => {
            const patternCheck = /^[0-9\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                courseroom : e.target.value
            })
        }
        }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        coursecapacityChangeHandler = (e) => {
            const patternCheck = /^[0-9\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                coursecapacity : e.target.value
            })
        }
        }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        coursewaitlistChangeHandler = (e) => {
            const patternCheck = /^[0-9\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                coursewaitlist : e.target.value
            })
        }
        }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        coursetermChangeHandler = (e) => {
            const patternCheck = /^[a-zA-Z\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                courseterm : e.target.value
            })
        }
        }

        handleCheckboxInputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
          //  const isFaculty = target.isFaculty;
        
            this.setState({
                isFaculty: value
            });
          }


        renderRedirect = (e) => {
            if (this.state.redirect) {
              return <Redirect to='/Dashboardfaculty' />
            }
          }

        //submit Login handler to send a request to the node backend
        CourseCreationCall = (e) => {

            console.log(e.target.id);
            console.log('check add zala ka book');
             e.preventDefault();
             const data = {
                courseid : this.state.courseid,
                coursename : this.state.coursename,
                coursedept : this.state.coursedept,
                coursedesc : this.state.coursedesc,
                courseroom : this.state.courseroom,
                coursecapacity : this.state.coursecapacity,
                coursewaitlist : this.state.coursewaitlist,
                courseterm : this.state.courseterm
             }
             console.log(data);
              axios.defaults.withCredentials = true;
            // var token = localStorage.getItem("token");
            // console.log(token);
            //  axios.post('http://'+rooturl+':3000/Dashboard/coursecreation',data, {
            //   headers: {"Authorization" : `Bearer ${token}`}
            //   })
            //      .then(response => {
            //          console.log("Status Code : ",response);
            //          if(response.status === 200){
            //              this.setState({
            //                  data : response.data,
            //                  redirect : true
            //              })
            //              localStorage.setItem('courseid',JSON.stringify (this.state.courseid));
            //              console.log("testing this.state.courseid",+this.state.courseid);
            //              if(this.state.redirect)
            //                alert("Course Created Successfully !!");
            //              console.log("I am in if here");
            //          }else{
            //              this.setState({
            //                  authFlag : false
            //              })
            //              console.log("I am here");
            //          }
            //      });


            this.props.coursecreationMutation({
              variables:{
                courseid : this.state.courseid,
                coursename : this.state.coursename,
                coursedept : this.state.coursedept,
                coursedesc : this.state.coursedesc,
                courseroom : this.state.courseroom,
                coursecapacity : this.state.coursecapacity,
                coursewaitlist : this.state.coursewaitlist,
                courseterm : this.state.courseterm
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
                      onChange = {this.courseidChangeHandler} 
                      type="text" 
                      class="form-control" 
                      name="courseid" 
                      placeholder="Course Id" 
                      required 
                      autoFocus 
                      autoComplete 
                      pattern="[0-9]{1-20}"
                     />
                 </div>
                        <div style={{width: '100%'}} class="form-group">
                           <input 
                             onChange = {this.coursenameChangeHandler} 
                             type="text" 
                             class="form-control" 
                             name="coursename" 
                             placeholder="Course Name" 
                             required 
                             autoFocus 
                             autoComplete 
                            />
                        </div>

                        <div style={{width: '100%'}} class="form-group">
                        <input 
                          onChange = {this.coursedeptChangeHandler} 
                          type="text" 
                          class="form-control" 
                          name="coursedept" 
                          placeholder="Course Department" 
                          required 
                          autoFocus 
                          autoComplete 
                     //     pattern="[a-zA-Z]{1-20}"
                         />
                     </div>
                     <div style={{width: '100%'}} class="form-group">
                     <input 
                       onChange = {this.coursedescChangeHandler} 
                       type="text" 
                       class="form-control" 
                       name="coursedesc" 
                       placeholder="Course Description" 
                       required 
                       autoFocus 
                       autoComplete 
                       //pattern="[a-zA-Z]{1-20}"
                      />
                  </div>
                  <div style={{width: '100%'}} class="form-group">
                  <input 
                    onChange = {this.courseroomChangeHandler} 
                    type="text" 
                    class="form-control" 
                    name="courseroom" 
                    placeholder="Course Room" 
                    required 
                    autoFocus 
                    autoComplete 
                  //  pattern="[0-9]{1-20}"
                   />
               </div>
               <div style={{width: '100%'}} class="form-group">
               <input 
                 onChange = {this.coursecapacityChangeHandler} 
                 type="text" 
                 class="form-control" 
                 name="coursecapacity" 
                 placeholder="Course Capacity" 
                 required 
                 autoFocus 
                 autoComplete 
                // pattern="[0-9]{1-20}"
                />
            </div>
            <div style={{width: '100%'}} class="form-group">
            <input 
              onChange = {this.coursewaitlistChangeHandler} 
              type="text" 
              class="form-control" 
              name="waitlistcapacity" 
              placeholder="Waitlist Capacity" 
              required 
              autoFocus 
              autoComplete 
            //  pattern="[0-9]{1-20}"
             />
         </div>
                        <div style={{width: '100%'}} class="form-group">
                            <input 
                              onChange = {this.coursetermChangeHandler} 
                              type="text" class="form-control" 
                              name="courseterm" 
                              placeholder="Course Term" 
                              required 
                              autoFocus 
                              autoComplete 
               //               pattern="[a-zA-Z]{1-20}"
                            />
                        </div>
                        <br/>
                        <div style={{width: '100%'}}>
                        {this.renderRedirect()}
                        <button 
                          onClick = {this.CourseCreationCall} 
                          class="btn btn-success" 
                          type="submit">
                          Create Course
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

//export default CourseCreation;


export default compose(
  graphql(coursecreationMutation,{name:"coursecreationMutation"})
)(CourseCreation);