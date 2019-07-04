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
import {
  SidePage as BaseAppContainer,
  ExampleNavigation as BaseNavigation
} from "./containers";
import {Redirect} from 'react-router';
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
const colorArr = [
  "orange"
];

class Dashboard extends React.Component {
  
  constructor(props){
    super(props);

    this.setRedirect = this.setRedirect.bind(this);
    this.setAnnouncement = this.setAnnouncement.bind(this);
    this.setSideBar = this.setSideBar.bind(this);

    this.state = {
      color: "hotpink"
    };


    this.state = {
      flagcheck :false,
      flagcheck1 : false,
      flagcheck2 : false,
      quizcreate : false,
      redirect : false,
      ProfileImage: "",
      ProfileImagePreview: false
  }

  this.state = {  
    announcements : []
}
  this.state = {
    accountprofile : false
}
this.state = {
  announcement : false
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

    renderQuizCreation = (e) => {
      if (this.state.quizcreate) {
        return <Redirect to='/Dashboard/quizcreation' />
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
      console.log('Aa raaaalal idhar');
      console.log(this.state.announcement);
      if (this.state.announcement) {
        console.log('Aa raaaa idhar');
        return <Redirect to='/Dashboard/accountprofile' />
      }
    }
            //submit Login handler to send a request to the node backend
            setRedirect = (e) => {

              console.log(e.target.id);
              console.log('check enroll zala ka book');
               //prevent page from refresh
               e.preventDefault();
               const data = {
                  sjsuId : this.state.sjsuId,
                  password : this.state.password,
                  isFaculty : this.state.isFaculty
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
              
               console.log("ALo baba ithe"); 
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
                this.state.flagcheck = false;
                 console.log("ALo baba ithe"); 
             }

            //submit Login handler to send a request to the node backend
            setAccoutProfile = (e) => {

              console.log(e.target.id);
              console.log('check enroll zala ka book');
               //prevent page from refresh
               e.preventDefault();
                  var contsa = JSON.parse(localStorage.getItem('sjsuid'));
                  //var contsa = localStorage.getItem('sjsuid');
                  console.log(contsa);
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
                           console.log(data);
                           console.log(response.data[0].name);
                           localStorage.setItem('name',JSON.stringify(response.data[0].name));
                           localStorage.setItem('emailid',JSON.stringify(response.data[0].emailid));
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
                 axios.post('http://localhost:3000/Dashboard/announcement',data)
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
              setSideBar = (e) => {

                this.state.flagcheck2 = true;
             }

             renderRedirect = (e) => {
              if (this.state.redirect) {
                return <Redirect to='/Dashboard' />
              }
            }


                
        componentDidMount() {
          axios.defaults.withCredentials = true;
  
                      //Download image
                      axios.post('http://localhost:3000/downloadprofile/')
                          .then(response => {
                              let imageDashboardProfile = 'data:image/jpg;base64, ' + response.data;
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

  }


  changeColor(event) {
    this.setState({
      color: event.target.value
    });
  }


    render(){

              
// <div  style={{width: '20%', height: '50'}}>
// <section style={{backgroundColor : this.state.color}} id="hello-world" >

// <h2>CMPE</h2>
// <ul style={{backgroundColor : "Brown",width: '100%', height: '50'}} >
// <li><Link to="/Dashboard/quizcreation">273 CMPE Distrubuted Systems</Link></li>
// </ul>
// </section>
// </div>
          
      const flagcheck = this.state.flagcheck;
      const flagcheck1 = this.state.flagcheck1;
      const sidebox_click = this.state.flagcheck2;
      console.log(flagcheck);
      let textbox,textbox1,textbox2,textbox3,sidebox;
      console.log(this.state.flagcheck2);
      if (flagcheck)
      {
        //this.state.flagcheck = false;
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

  if(sidebox_click)
  {
      console.log(sidebox_click);
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
        {this.renderQuizCreation()}
        <Nav id="5">
        <IconCnt>
        <Icon icon={ship} />
        </IconCnt>
          <Text onClick = {this.setQuizCreation}>Grade</Text>
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

       <div>
       {sidebox}
       </div>
      </SidePage>

      </div>  
       )
    }
}
export default Dashboard;