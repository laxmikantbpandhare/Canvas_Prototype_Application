import React from "react";
import { SideNav, Nav as BaseNav } from "react-sidenav";
import styled from "styled-components";
import {
  SidePage as BaseAppContainer,
  ExampleNavigation as BaseNavigation
} from "./containers";
import { Icon as BaseIcon } from "react-icons-kit";
import { home } from "react-icons-kit/fa/home";
import { book } from "react-icons-kit/fa/book";
import { question } from "react-icons-kit/fa/question";
import { hourglass } from "react-icons-kit/fa/hourglass";
import { user } from "react-icons-kit/fa/user";
import { codepen } from "react-icons-kit/fa/codepen";
import { comment } from "react-icons-kit/fa/comment";
import { file } from "react-icons-kit/fa/file";
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import axios from 'axios';

const SidePage = styled(BaseAppContainer)`
  height: calc(100vh - 40px);
`;

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

class DashboardFaculty extends React.Component {
  
  constructor(props){
    super(props);

    this.setRedirect = this.setRedirect.bind(this);
    // this.announcementChangeHandler = this.announcementChangeHandler.bind(this);

    this.state = {
      flagcheck :false,
      redirect : false,
      coursecreate : false,
      filecreate : false,
      quizcreate : false,
      announcement : false,
      courses : false,
      announcementbutton : false
  }
  this.state = {
    accountprofile : false
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

  }
    state = { selectedPath: "1" };

    onItemSelection = arg => {
      this.setState({ selectedPath: arg.path });
    };

    renderRedirect = (e) => {
      if (this.state.redirect) {
        return <Redirect to='/Dashboard/enroll' />
      }
    }
    x
    renderCourseCreation = (e) => {
      if (this.state.coursecreate) {
        return <Redirect to='/DashboardFaculty/coursecreation' />
      }
    }
    renderFileCreation = (e) => {
      if (this.state.filecreate) {
        return <Redirect to='/DashboardFaculty/proffile' />
      }
    }
    renderQuizCreation = (e) => {
      if (this.state.quizcreate) {
        return <Redirect to='/DashboardFaculty/quizcreation' />
      }
    }

    renderLogout = (e) => {
      if (this.state.logout) {
        return <Redirect to='/' />
      }
    }
 
    renderSamePage = (e) => {
      if (this.state.samepage) {
        this.state.flagcheck = false;
        console.log("Coming to same page dashboard");
        return <Redirect to='/DashboardFaculty' />
      }
    }

    renderAnnouncement = (e) => {
      if (this.state.announcement) {
        //this.state.flagcheck = false;
        console.log("Coming to same page dashboard");
        return <Redirect to='/DashboardFaculty/announcement' />
      }
    }


           //submit Login handler to send a request to the node backend
           setCourseCreation = (e) => {

            this.state.coursecreate = true;

         }

                    //submit Login handler to send a request to the node backend
                    setFileCreation = (e) => {

                      this.state.filecreate = true;
          
                   }

           //submit Login handler to send a request to the node backend
           setQuizCreation = (e) => {

            this.state.quizcreate = true;

         }       

            //submit Login handler to send a request to the node backend
            setRedirect = (e) => {

              console.log(e.target.id);
              console.log('check enroll zala ka book');
               //prevent page from refresh
               e.preventDefault();
               const data = {
                  sjsuId : this.state.sjsuId,
                  password : this.state.password
               }
               console.log(data);
               //set the with credentials to true
               axios.defaults.withCredentials = true;
               //make a post request with the user data
               axios.get('http://localhost:3000/Dashboard/enroll',data)
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
            setLogout = (e) => {
              axios.post('http://localhost:3000/Dashboard/logout')
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
                alert("You are at SJSU Canvas DashBoard Page");
             }

            //submit Login handler to send a request to the node backend
            setAccoutProfile = (e) => {

              console.log(e.target.id);
               //prevent page from refresh
               e.preventDefault();
                  var contsa = JSON.parse(localStorage.getItem('sjsuid'));
                  //var contsa = localStorage.getItem('sjsuid');
                  console.log(contsa);
               //var contsa = localStorage.getItem('sjsu_id');
            //   localStorage.getItem('sjsu_id') && this.setState({
            //    contacts: JSON.parse(localStorage.getItem('sjsu_id')),
             //   isloading: false
              // });
               const data = {
                  sjsuId : contsa
               }
               console.log("data="+contsa);
               //set the with credentials to true
               axios.defaults.withCredentials = true;
               //make a post request with the user data
               axios.post('http://localhost:3000/Dashboard/accountprofile',data)
                   .then(response => {
                       console.log("Status Code : ",response);
                       if(response.status === 200){ 
                           this.setState({
            //                   data : JSON.parse(response),
                               data : response.data[0].name,
                               email : response.data[0].emailid,
                               sjsuid : response.data[0].sjsuid,
                               flagcheck : true,
                               accountprofile: false
                           })
                         //  data : JSON.parse(response),
                        // var yourval = jQuery.parseJSON(JSON.stringify(res));
                        // console.log(JSON.parse(yourval));
                           console.log(data);
                       //    console.log(email);
                           console.log(response.data[0].name);
                           console.log("Faculty checl");
                          // console.log(data.sjsuid);
                       //    localStorage.setItem('sjsuid',JSON.stringify(data.sjsuId));
                           localStorage.setItem('name',JSON.stringify(response.data[0].name));
                           localStorage.setItem('emailid',JSON.stringify(response.data[0].emailid));
                           console.log("I am in if loop");
                       }else{
                           console.log("I am here");
                       }
                   });
           }

          //   //submit Login handler to send a request to the node backend
          //   setAnnouncement = (e) => {
          //         this.state.announcement = true;
          //  }

            //submit Login handler to send a request to the node backend
            setAnnouncement = (e) => {

              this.state.announcement = true;

           }
          

           setCourses = (e) => {

            this.state.courses = true;
            
           }

    render(){

      const flagcheck = this.state.flagcheck;
      console.log("flacgcheck",flagcheck);
      let textbox,textbox1,textbox2,h1,textarea,announce,sidebox;
      if (flagcheck)
      {
        this.state.flagcheck = false;
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


      if(this.state.courses)
      {
        //console.log(this.state.courses)
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
           {this.renderCourseCreation()}
           <Nav id="3">
           <IconCnt>
           <Icon icon={book} />
           </IconCnt>
             <Text onClick = {this.setCourseCreation} >Course</Text>
           </Nav>
           </div>
           <div>
           {this.renderFileCreation()}
           <Nav id="3">
           <IconCnt>
           <Icon icon={file} />
           </IconCnt>
             <Text onClick = {this.setFileCreation} >File</Text>
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
             <Text onClick = {this.setQuizCreation} >Quiz</Text>
           </Nav>
           </div>
         </SideNav>
       </Navigation>

      <div>
       {h1}
       {textarea}
        {announce}
      </div>
     </SidePage>
     </div>  
      }

      //if not logged in go to login page
      let redirectVar = null
      if(cookie.load('cookie')){
        redirectVar = <Redirect to= "/"/>
      }
       return(
         <div>
         {redirectVar}
        <SidePage>
        <Navigation>
            <SideNav
              defaultSelectedPath="1"
              theme={theme}
              onItemSelection={this.onItemSelection}
            >
            <div>
            <Nav id="0">
              <Text>SJSU</Text>
            </Nav>
            </div>
            <div>
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
            <Nav id="3" onClick = {this.setCourses} >
            <IconCnt>
            <Icon icon={book} />
            </IconCnt>
              <Text>Courses</Text>
            </Nav>
            </div>
            <div>
            {this.renderAnnouncement()}
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

       <div>
       {sidebox}
       </div>
      </SidePage>
      </div>  
       )
    }
}

export default DashboardFaculty;