import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './LandingPage/Login';
import SignUp from './SignUp/SignUp';
import Dashboard from './Dashboard/Dashboard';
import DashboardFaculty from './Dashboard/DashboardFaculty';
import Enroll from './Enroll/Enroll';
import CourseCreation from './CourseCreation/CourseCreation';
import CreateQuiz from './Quiz/CreateQuiz';
import grade from './Grade/grade';
import gradestud from './Grade/gradestud';
import GiveQuiz from './Quiz/GiveQuiz';
import Announcement from './Announcement/Announcement';
import AccountProfile from './AccountProfile/AccountProfile';
import profupload from './File/profupload';
import acctdetailsup from './acctdetails/acctdetailsup';

//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                {/*Render Different Component based on  Route*/}
                <Route exact path="/" component={Login}/>
                <Route path="/SignUp" component={SignUp}/>
                <Route exact path="/Dashboard" component={Dashboard}/>
                <Route exact path="/DashboardFaculty" component={DashboardFaculty}/>
                <Route path="/Dashboard/enroll" component={Enroll}/>
                <Route path="/DashboardFaculty/coursecreation" component={CourseCreation}/>
                <Route path="/DashboardFaculty/quizcreation" component={CreateQuiz}/>
                <Route path="/DashboardFaculty/grade" component={grade}/>
                <Route path="/Dashboard/gradestud" component={gradestud}/>
                <Route path="/Dashboard/quizcreation" component={GiveQuiz}/>
                <Route path="/DashboardFaculty/announcement" component={Announcement}/>
                <Route path="/Dashboard/accountprofile" component={AccountProfile}/>
                <Route path="/DashboardFaculty/proffile" component={profupload}/>
                <Route path="/Dashboard/ChangeDetails" component={acctdetailsup}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;