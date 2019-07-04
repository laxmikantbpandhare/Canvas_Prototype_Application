import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Dashboard from './Dashboard/Dashboard';
import DashboardFaculty from './Dashboard/DashboardFaculty';
import Enroll from './Enroll/Enroll';
import CourseCreation from './CourseCreation/CourseCreation';
// import CreateQuiz from './Quiz/CreateQuiz';
// import grade from './Grade/grade';
// import gradestud from './Grade/gradestud';
// import GiveQuiz from './Quiz/GiveQuiz';
// import Announcement from './Announcement/Announcement';
 import AccountProfile from './UpdateProfile/UpdateProfile';
import UpdateProfile from './UpdateProfile/UpdateProfile';
// import profupload from './File/profupload';
// import acctdetailsup from './acctdetails/acctdetailsup';

//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                {/*Render Different Component based on  Route*/}
                <Route exact path="/" component={Login}/>
                <Route path="/signup" component={SignUp}/>
                <Route exact path="/Dashboard" component={Dashboard}/>
                <Route exact path="/DashboardFaculty" component={DashboardFaculty}/>
                <Route path="/DashboardFaculty/coursecreation" component={CourseCreation}/>
                <Route path="/Dashboard/updateprofile" component={UpdateProfile}/>
                <Route path="/Dashboard/enroll" component={Enroll}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;