import React from "react";
import { SideNav, Nav as BaseNav } from "react-sidenav";
import styled from "styled-components";
import { Icon as BaseIcon } from "react-icons-kit";
import { user } from "react-icons-kit/fa/user";
import { home } from "react-icons-kit/fa/home";
import { book } from "react-icons-kit/fa/book";
import { file } from "react-icons-kit/fa/file";
import { ship } from "react-icons-kit/fa/ship";
import { codepen } from "react-icons-kit/fa/codepen";
import { comment } from "react-icons-kit/fa/comment";
import { hourglass } from "react-icons-kit/fa/hourglass";
import { question } from "react-icons-kit/fa/question";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";


//import styled from 'styles-components';
import {
  SidePage as BaseAppContainer,
  ExampleNavigation as BaseNavigation
} from "./containers";
import {Redirect} from 'react-router';
import axios from 'axios';
//import {rooturl} from '../../config/settings';
import {rooturl} from '../../AWS/settings';

import Droppable from './Droppable'

import Draggable from './Draggable'

const SidePage = styled(BaseAppContainer)`
  height: calc(100vh - 40px);
`;

const wrapper = styled.div`
  width: 100%;
  padding: 32px;
  display: fles;
  justify-content: center;
`;

const Item = styled.div`
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
`;

const droppableStyle = {
  backgroundcolor: '#555',
  width: '250px',
  height: '400px',
  margin: '32px'
}

const Navigation = styled(BaseNavigation)`
  background: #00009f;
  color: #8d97ad;
  font-size: 1em;
  letter-spacing: 2px;
  width: 100px;
  line-height: 22px;
`;

const IconCnt = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const Nav = styled(BaseNav)`
  flex-direction: column;
`;

const theme = {
  selectionColor: "#FFF",
  hoverBgColor: "#181b20",
  selectionBgColor: "#00BCD4"
};

const Text = styled.div`
  font-size: 0.63em;
  text-transform: uppercase;
`;



const Icon = props => <BaseIcon size={32} icon={props.icon} />;
const colorArr = [
  "orange"
];

class Dashboard extends React.Component {

  constructor(props){
    super(props);

    

    this.setRedirect = this.setRedirect.bind(this);
    this.setAnnouncement = this.setAnnouncement.bind(this);
    this.setInbox = this.setInbox.bind(this);
    this.setSideBar = this.setSideBar.bind(this);

    this.state = {
      color: "hotpink"
    };


    this.state = {
      flagcheck :false,
      flagcheck1 : false,
      flagcheck2 : false,
      quizcreate : false,
      changedtls : false,
      redirect : false,
      ProfileImage: "",
      grade : false,
      ProfileImagePreview: false
  }


  this.state = {  
    books : ["1"]
}

  this.state = {  
    announcements : []
}
  this.state = {
    accountprofile : false
}
this.state = {
  announcement : false,
  inbox : false
}
  this.state = {
    logout : false,
    samepage : false
  }

  this.state = {  
    data : [],
    email :[],
    contsa : []
}

this.state = {  
  books : []
}

  }
    state = { selectedPath: "1" };

    onItemSelection = arg => {
      this.setState({ selectedPath: arg.path });
    };

    renderQuizCreation = (e) => {
      if (this.state.quizcreate) {
        return <Redirect to='/Dashboard/quizcreation' />
      }
    }

    renderGrade = (e) => {
      if (this.state.grade) {
        return <Redirect to='/Dashboard/gradestud' />
      }
    }

      //submit Login handler to send a request to the node backend
      setQuizCreation = (e) => {
        this.state.quizcreate = true;
      } 

    renderEnrollRedirect = (e) => {
      if (this.state.redirect) {
        return <Redirect to='/Dashboard/enroll' />
      }
    }
    
    renderLogout = (e) => {
      if (this.state.logout) {
        console.log("logout is working");
        return <Redirect to='/' />
      }
    }

    renderSamePage = (e) => {
      if (this.state.samepage) {
        alert("You are at SJSU Canvas DashBoard Page");
        this.state.samepage = false;
        this.state.accountprofile = false;
        this.state.flagcheck = false;
        return <Redirect to='/Dashboard' />
      }
    }

    renderAnnouncement = (e) => {
     // console.log('Aa raaaalal idhar');
      //console.log(this.state.announcement);
      if (this.state.announcement) {
       // console.log('Aa raaaa idhar');
        return <Redirect to='/Dashboard/accountprofile' />
      }
    }
    renderInbox = (e) => {
      // console.log('Aa raaaalal idhar');
       //console.log(this.state.announcement);
       if (this.state.announcement) {
        // console.log('Aa raaaa idhar');
         return <Redirect to='/Dashboard/accountprofile' />
       }
     }
            //submit Login handler to send a request to the node backend
            setRedirect = (e) => {

              console.log(e.target.id);
              console.log('check enroll zala ka book');
               //prevent page from refresh
               e.preventDefault();
               this.setState({
            //    data : response.data,
                redirect: true,
          //      errorlogin: response.data
            })
               const data = {
                  sjsuId : this.state.sjsuId,
                  password : this.state.password,
                  isFaculty : this.state.isFaculty
               }
               console.log(data);
               //set the with credentials to true
               axios.defaults.withCredentials = true;
               //make a post request with the user data
               var token = localStorage.getItem("token");
                axios.get('http://'+rooturl+':3000/Dashboard/enroll',data)//, {
              //   headers: {"Authorization" : `Bearer ${token}`}
              //   })
                   .then(response => {
                       console.log("Status Code : ",response);
                       if(response.status === 200){ 
                           this.setState({
                               data : response.data,
                               redirect: true,
                               errorlogin: response.data
                           })
                       }else{
                           console.log("I am here");
                       }
                   });
           }

                       //submit Login handler to send a request to the node backend
                       setGrade = (e) => {

                        console.log(e.target.id);
                        console.log('check enroll zala ka book');
                         //prevent page from refresh
                         e.preventDefault();
                         this.setState({
                      //    data : response.data,
                          grade: true,
                    //      errorlogin: response.data
                      })
                         const data = {
                            sjsuId : this.state.sjsuId,
                            password : this.state.password,
                            isFaculty : this.state.isFaculty
                         }
                         console.log(data);
                         //set the with credentials to true
                         axios.defaults.withCredentials = true;
                         //make a post request with the user data
                         var token = localStorage.getItem("token");
                          axios.post('http://'+rooturl+':3000/Dashboard/gradestud',data)//, {
                        //   headers: {"Authorization" : `Bearer ${token}`}
                        //   })
                             .then(response => {
                                 console.log("Status Code : ",response);
                                 if(response.status === 200){ 
                                     this.setState({
                                         data : response.data,
                                         grade: true,
                                         errorlogin: response.data
                                     })
                                 }else{
                                     console.log("I am here");
                                 }
                             });
                     }

            //submit Login handler to send a request to the node backend
            setLogout = (e) => {
              
             //  console.log("ALo baba ithe"); 
               var token = localStorage.getItem("token");
               axios.post('http://'+rooturl+':3000/Dashboard/logout')//, {
                // headers: {"Authorization" : `Bearer ${token}`}
                // })
               .then(response => {
                   console.log("Status Code : ",response);
                   if(response.status === 200){ 
                       this.setState({
                           logout : true
                       })
                   }else{
                       console.log("I am here");
                   }
               });
           }

              //submit Login handler to send a request to the node backend
              setSamePage = (e) => {
                this.state.samepage = true;
                this.state.flagcheck = false;
            //     console.log("ALo baba ithe"); 
             }

            //submit Login handler to send a request to the node backend
            setAccoutProfile = (e) => {

            //  console.log(e.target.id);
         //     console.log('check enroll zala ka book 100');
               //prevent page from refresh
               e.preventDefault();
                  var contsa = JSON.parse(localStorage.getItem('sjsuid'));
                  //var contsa = localStorage.getItem('sjsuid');
                  console.log(contsa);
               const data = {
                  sjsuId : contsa
               }
             //  console.log("data="+contsa);
               //set the with credentials to true
               axios.defaults.withCredentials = true;
               //make a post request with the user data
               console.log("Calling Account proifle");
               var token = localStorage.getItem("token");
               axios.post('http://'+rooturl+':3000/Dashboard/accountprofile',data, {
                headers: {"Authorization" : `Bearer ${token}`}
                })
                   .then(response => {
                       console.log("Status Code : ",response.data.name);
                       if(response.status === 200){ 
                           this.setState({
            //                   data : JSON.parse(response),
                               data : response.data.name,
                               email : response.data.emailid,
                               sjsuid : response.data.sjsuid,
                               flagcheck : true,
                               accountprofile: false
                           })
                           console.log(data);
                           localStorage.setItem('name',JSON.stringify(response.data.name));
                           localStorage.setItem('emailid',JSON.stringify(response.data.emailid));
                           console.log("I am in if loop");
                       }else{
                           console.log("I am here");
                       }
                   });
           }

              //submit Login handler to send a request to the node backend
              setAnnouncement = (e) => {

                console.log(e.target.id);
                 //prevent page from refresh
                 e.preventDefault();
                 var contsa = JSON.parse(localStorage.getItem('sjsuid'));
                 console.log(contsa);
                 const data = {
                    sjsuId : contsa
                 }
                 console.log("data="+contsa);
                 //set the with credentials to true
                 axios.defaults.withCredentials = true;
                 //make a post request with the user data
                 var token = localStorage.getItem("token");
                 axios.post('http://'+rooturl+':3000/Dashboard/announcement',data, {
                  headers: {"Authorization" : `Bearer ${token}`}
                  })
                     .then(response => {
                         console.log("Status Code : ",response);
                         if(response.status === 200){ 
                             this.setState({
                                 data : response.data[0].announcement,
                                 flagcheck1 : true,
                                 announcement : false
                             })
                             console.log(this.state.flagcheck1);
                             console.log("I am in if loop");
                         }else{
                             console.log("I am here");
                         }
                     });
             }

 //submit Login handler to send a request to the node backend
 setInbox = (e) => {

  console.log(e.target.id);
   //prevent page from refresh
   e.preventDefault();
   var contsa = JSON.parse(localStorage.getItem('sjsuid'));
   console.log(contsa);
   const data = {
      sjsuId : contsa
   }
   console.log("data="+contsa);
   //set the with credentials to true
   axios.defaults.withCredentials = true;
   //make a post request with the user data
   var token = localStorage.getItem("token");
   axios.post('http://'+rooturl+':3000/Dashboard/Announcement',data, {
    headers: {"Authorization" : `Bearer ${token}`}
    })
       .then(response => {
           console.log("Status Code : ",response);
           if(response.status === 200){ 
               this.setState({
                   data : response.data[0].announcement,
                   flagcheckz : true,
                   inbox : false
               })
               console.log(this.state.flagcheck1);
               console.log("I am in if loop");
           }else{
               console.log("I am here");
           }
       });
}


              //submit Login handler to send a request to the node backend
              setSideBar = (e) => {

                this.state.flagcheck2 = true;
             }

             renderRedirect = (e) => {
              if (this.state.redirect) {
                return <Redirect to='/Dashboard' />
              }
            }

            renderChangeDetails = (e) => {
              if (this.state.changedtls==true) {
                return <Redirect to='/Dashboard/ChangeDetails' />
              }
            }

              //submit Login handler to send a request to the node backend
              setChangeDetailsCall = (e) => {

                this.state.changedtls = true;
             }

                           //submit Login handler to send a request to the node backend
                           setLogout = (e) => {

                            this.state.logout = true;
                         }


                
        componentDidMount() {
          axios.defaults.withCredentials = true;
  
                      //Download image
                      console.log("in download");
                      var token = localStorage.getItem("token");
                      axios.post('http://'+rooturl+':3000/downloadprofile/')
                          .then(response => {
                           // console.log(response.data);
                              let imageDashboardProfile = 'data:image/jpg;base64, ' + response.data;
                              console.log("downloaded");
                              this.setState({
                                  ProfileImagePreview: imageDashboardProfile
                              })
  
                          });
                          let colorPos = 0;
                          setInterval(() => {
                            if(colorArr.length - 1 > colorPos) {
                              this.setState({
                                color: colorArr[colorPos]
                              });
                              colorPos++
                            } else {
                              this.setState({
                                color: colorArr[colorPos]
                              });
                              colorPos = 0;
                            }
                          }, 2000); 

                         var contsa = JSON.parse(localStorage.getItem('sjsuid'));
                         console.log(contsa);
                          //prevent page from refresh

                          const data = {
                             sjsuId : contsa
                          }
                          axios.post('http://'+rooturl+':3000/Dashboard/subject/details',data)//, {
                            // headers: {"Authorization" : `Bearer ${token}`}
                            // })
                               .then(response => {
                                   console.log("Status Code : ",response);
                                   if(response.status === 200){
                   
                                    console.log("response data");
                                    console.log(response.data); 
                                      this.setState({
                                        tripDetailsForFiltering: response.data,
                                        courses : response.data,
                                        books : this.state.books.concat(response.data)        
                                    })
                
                                      //  console.log("Courses"+response.data);
                                      //  console.log("books"+this.state.books);
                                       console.log("I am in if here");
                                   }else{
                                       this.setState({
                                           authFlag : false
                                       })
                                       console.log("I am here");
                                   }
                               });
  
  }


  changeColor(event) {
    this.setState({
      color: event.target.value
    });
  }

  // drag = (e) => 
  // {
  //    e.dataTransfer.setData('transfer',e.target.id);
  // }



  // drop = (e) => {
  //   e.preventDefault();
  //   const data = e.dataTransfer.getData('transfer');
  //   e.target.appendChild(document.getElementById(data));
  // }

  // allowDrop = (e) => {
  //   e.preventDefault();

  // }



    render(){

        let book1 = this.props.book;
        var counter = 0;


        let tripdetails = this.state.books.map(book => {
          return(


              <div>
              <Card style={{ width: '18rem' }}>

              <CardBody>Course {counter=counter+1}</CardBody>
              <CardFooter>{book.coursename}</CardFooter>

              </Card>

              </div>


          )
          
      })



      let check,check1;
      check = 
      <div  style={{width: '100%', height: '100'}} id={this.props.id} draggable="true" onDragStart={this.drag} style={this.props.style}>
      {this .props.children}
      <section style={{backgroundColor : this.state.color}} id="hello-world" >
      
      <ul style={{backgroundColor : "Yellow",width: '100%', height: '50'}} >
      <li><Link to="/Dashboard/quizcreation">CMPE</Link></li>
      </ul>
      <ul style={{backgroundColor : "Brown",width: '100%', height: '50'}} >
      <li><Link to="/Dashboard/quizcreation">202 CMPE Software Systems</Link></li>
      </ul>
      </section>
      </div>



      const flagcheck = this.state.flagcheck;
      const flagcheck1 = this.state.flagcheck1;
      const flagcheckz = this.state.flagcheckz;
      const sidebox_click = this.state.flagcheck2;
      let textbox,textbox1,textbox2,textbox3,sidebox,textbox4,textbox5;
      if (flagcheck==true)
      {
        flagcheck : false;
        textbox = 

        <div style={{width: '100%'}} class="form-group">                  
        <input 
          type="text" class="form-control" 
          name="name" 
          placeholder="Name" 
          required 
          autoFocus 
          autoComplete 
          value={this.state.data}
        /><br/><br/>
        </div>

        textbox1 =
        <div style={{width: '100%'}} class="form-group">                        
        <input 
          type="text" class="form-control" 
          name="name" 
          placeholder="Name" 
          required 
          autoFocus 
          autoComplete 
          value={this.state.email}
        /><br/><br/>
        {this.renderChangeDetails()}
        <button 
          onClick = {this.setChangeDetailsCall} 
          class="btn btn-success" 
          type="submit">
          Change Details
        </button>
        </div>

        textbox2 = 
        <div style={{width: '100%'}} class="form-group">  
        <br/>
        <h1> Please verify Below Details.</h1>   <br/>                      
        <input 
          type="text" class="form-control" 
          name="name" 
          placeholder="Name" 
          required 
          autoFocus 
          autoComplete 
          value={this.state.sjsuid}
        /><br/><br/>
        </div>
      }

      if(flagcheck1){
       // this.state.flagcheck1 = false;
    textbox3 =
    <div style={{width: '150%',height:'5%'}} class="form-group">
    <h1> Please check below message.</h1>   <br/> 
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
    value={this.state.data}
    />                     
    </div>

  }

  if(flagcheckz){
    // this.state.flagcheck1 = false;
 textbox3 =
 <div style={{width: '150%',height:'5%'}} class="form-group">
 <h1> You have one Message in your Inbox.</h1>   <br/> 
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
 value={this.state.data}
 />                     
 </div>

}
 

  if(sidebox_click)
  {
    sidebox_click : false;
  sidebox =
    <div>
    <SidePage>
    <Navigation>
        <SideNav
          defaultSelectedPath="1"
          theme={theme}
          onItemSelection={this.onItemSelection}
        >

        <div>
        <Nav id="3">
        <IconCnt>
        <Icon icon={file} />
        </IconCnt>
          <Text>Files</Text>
        </Nav>
        </div>
        <div>
        {this.renderAnnouncement()}
        <Nav id="4">
        <IconCnt>
        <Icon icon={comment} />
        </IconCnt>
          <Text onClick = {this.setAnnouncement} >Announcement</Text>
        </Nav>
        </div>
        <div>
        {this.renderQuizCreation()}
        <Nav id="5">
        <IconCnt>
        <Icon icon={codepen} />
        </IconCnt>
          <Text onClick = {this.setQuizCreation}>Quiz</Text>
        </Nav>
        </div>
        <div>
        {this.renderGrade()}
        <Nav id="5">
        <IconCnt>
        <Icon icon={ship} />
        </IconCnt>
          <Text onClick = {this.setGrade}>Grade</Text>
        </Nav>
        </div>
        <div>
        {this.renderInbox()}
        <Nav id="4">
        <IconCnt>
        <Icon icon={comment} />
        </IconCnt>
          <Text onClick = {this.setInbox} >Inbox</Text>
        </Nav>
        </div>
      </SideNav>
    </Navigation>
   <div>
   {textbox3}
   </div>
  </SidePage>
  </div>
  }

  let profileImage = <img src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" 
                              alt="logo" 
                              style={{width: '80%',height:'80%'}}/>

  if (this.state.ProfileImagePreview) {
      profileImage = <img src={this.state.ProfileImagePreview} 
                          alt="logo" 
                          style={{width: '80%',height:'80%'}}/> 
    }
       return(



        <div>

        
         <div>

         <div><br/>
         <h1>SJSU&nbsp; &nbsp; &nbsp;Dashboard</h1>
         </div>
        <SidePage>
        <Navigation>
            <SideNav
              defaultSelectedPath="1"
              theme={theme}
              onItemSelection={this.onItemSelection}
            >
            <div>
            <Nav id="0">
            {profileImage}
          </Nav>
            <Nav id="1">
            <IconCnt >
            <Icon icon={user} />
            </IconCnt>
            <Text onClick = {this.setAccoutProfile}>Account</Text>
          </Nav>
            </div>
            <div>
            {this.renderSamePage()}
            <Nav id="2"  onClick = {this.setSamePage}>
            <IconCnt>
            <Icon icon={home} />
            </IconCnt>
              <Text>Dashboard</Text>
            </Nav>
            </div>
            <div>
            <Nav id="3"  onClick = {this.setSideBar}>
            <IconCnt>
            <Icon icon={book} />
            </IconCnt>
              <Text>Courses</Text>
            </Nav>
            </div>
            <div>
            {this.renderEnrollRedirect()}
            <Nav id="4">
            <IconCnt>
            <Icon icon={ship} />
            </IconCnt>
              <Text onClick = {this.setRedirect} >Enroll</Text>
            </Nav>
            </div>
            <div>
            <Nav id="5">
            <IconCnt>
            <Icon icon={question} />
            </IconCnt>
              <Text>Help</Text>
            </Nav>
            </div>
            <div>
            {this.renderLogout()}
            <Nav id="6">
            <IconCnt>
            <Icon icon={hourglass} />
            </IconCnt>
              <Text onClick = {this.setLogout}>Logout</Text>
            </Nav>
            </div>
 
          </SideNav>


        </Navigation>


        
   <div>
   {textbox2}
   {textbox}
   {textbox1}
  </div>






 <div class="container">
  <h2>List of Enrolled Courses</h2>
   <br/>
      <table class="table">
  {/*        <thead>
              <tr>
                  <th>CourseTerm</th>
                  <th>Course Id</th>
                  <th>Course Name</th>
              </tr>

          </thead>*/}
       <tbody>
  {/*}        <div>
          <Card>
          <CardBody>Courses Enrolled</CardBody>
          <CardFooter>{tripdetails}</CardFooter>
          </Card>
        </div>
        {tripdetails}*/}
             
          </tbody>
          {tripdetails}
      </table>

    
       </div> 





       <div>
       {sidebox}
       </div>
      </SidePage>

      </div>  
     </div>
       )
    }
}

export default Dashboard;