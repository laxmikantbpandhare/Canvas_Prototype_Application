import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { search } from '../../queries/queries';
import {withApollo} from 'react-apollo';
import {graphql,compose} from 'react-apollo';
import {enrollMutation} from '../../queries/queries';


class Enroll extends Component {

    constructor(props) {
        super(props);
        this.state = {
          redirect : false,
          redirectenrollment : false
      }
      this.state = {
        trips: [],
        tripDetails: [],
        errorRedirect: false,
        startIndex : 0,
        currentPage : 1,
        pagesPerPage : 5,
        ownerDashBoardTrips: [],
        tripDetailsForFiltering : []
}



      this.state = {
        courses : []
    }
      this.toggle = this.toggle.bind(this);
      this.state = {
        dropdownOpen: false
      };
      this.coruseinfoChangeHandler = this.coruseinfoChangeHandler.bind(this);
      this.enrollstudent = this.enrollstudent.bind(this);
      this.handleSearchChange = this.handleSearchChange.bind(this);
      this.handlePagination = this.handlePagination.bind(this);
      this.properyPagination = this.properyPagination.bind(this);

      this.state = {  
        books : []
    }
    }

    properyPagination(property){

      var index = this.state.tripDetails.indexOf(property);
      return index >= this.state.startIndex && index <= (this.state.startIndex + this.state.pagesPerPage - 1)

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
        SignUpCall1 = (e) => {

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


           axios.post('http://localhost:3000/Dashboard/enroll/details',data)//, {
            // headers: {"Authorization" : `Bearer ${token}`}
            // })
               .then(response => {
                   console.log("Status Code : ",response);
                   if(response.status === 200){
   
                       var trips = this.state.books.concat(response.data);
                       var tripsResult = trips.filter(function(property){
                           var index = trips.indexOf(property);
                           return index >= 0 && index <= 4;
                      });

                      this.setState({
                        data : response.data,
                        tripDetails : this.state.books.concat(response.data),   
                        ownerDashBoardTrips : tripsResult,
                        tripDetailsForFiltering: response.data,
                        redirect : true,
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


        //submit Login handler to send a request to the node backend
        SignUpCall2 = (e) => {

          console.log(e.target.id);
          console.log('check add zala ka book');
           //prevent page from refresh
           e.preventDefault();
           const data = {
              courseInfo : this.state.courseinfo
           }
          e.preventDefault();
         // var contsa = JSON.parse(localStorage.getItem('sjsuid'));
          //var contsa = localStorage.getItem('sjsuid');
           console.log(data);
           //set the with credentials to true
           axios.defaults.withCredentials = true;
          
           axios.post('http://localhost:3000/Dashboard/enroll/details1',data)//, {
            // headers: {"Authorization" : `Bearer ${token}`}
            // })
               .then(response => {
                   console.log("Status Code : ",response);
                   if(response.status === 200){
   
                       var trips = this.state.books.concat(response.data);
                       var tripsResult = trips.filter(function(property){
                           var index = trips.indexOf(property);
                           return index >= 0 && index <= 4;
                      });

                      this.setState({
                        data : response.data,
                        tripDetails : this.state.books.concat(response.data),   
                        ownerDashBoardTrips : tripsResult,
                        tripDetailsForFiltering: response.data,
                        redirect : true,
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

        //submit Login handler to send a request to the node backend
        SignUpCall3 = (e) => {

          console.log(e.target.id);
          console.log('check add zala ka book');
           //prevent page from refresh
           e.preventDefault();
           const data = {
              courseInfo : this.state.courseinfo
           }
          e.preventDefault();
         // var contsa = JSON.parse(localStorage.getItem('sjsuid'));
          //var contsa = localStorage.getItem('sjsuid');
           console.log(data);
           //set the with credentials to true
           axios.defaults.withCredentials = true;
          //  axios.post('http://localhost:3000/Dashboard/enroll/details2',data)//, {

          //      .then(response => {
          //          console.log("Status Code : ",response);
          //          if(response.status === 200){
   
          //              var trips = this.state.books.concat(response.data);
          //              var tripsResult = trips.filter(function(property){
          //                  var index = trips.indexOf(property);
          //                  return index >= 0 && index <= 4;
          //             });

          //             this.setState({
          //               data : response.data,
          //               tripDetails : this.state.books.concat(response.data),   
          //               ownerDashBoardTrips : tripsResult,
          //               tripDetailsForFiltering: response.data,
          //               redirect : true,
          //               courses : response.data,
          //               books : this.state.books.concat(response.data)        
          //           })

          //          }else{
          //              this.setState({
          //                  authFlag : false
          //              })
          //              console.log("I am here");
          //          }
          //      });


          this.props.client.query({
            query : search,
            variables: {
              courseInfo : this.state.courseinfo,
            }
        }).then((response)=>{
            console.log('Response', response.data.search)//.login.facultyfnd);




                      this.setState({
                   //     data : response.data,
                     //   tripDetails : this.state.books.concat(response.data),   
                       // ownerDashBoardTrips : tripsResult,
                       // tripDetailsForFiltering: response.data,
                   //       redirect : true,
                        courses : response.data.search.coursename,
                        books : this.state.books.concat(response.data)        
                    })

                    console.log("in call ",this.state.books);

            
            //     this.setState({
            //         redirect:response.data.login.finalstatus
            //     });
            //     this.setState({
            //       facultyfnd:response.data.login.facultyfnd
            //   });
            //   this.setState({
            //     validity:response.data.login.pwdvalidity
            // });

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

    //  var token = localStorage.getItem("token");
    //  axios.post('http://localhost:3000/Dashboard/enroll/enrollstudent',data, {
    //   headers: {"Authorization" : `Bearer ${token}`}
    //   })
    //      .then(response => {
    //          console.log("Status Code : ",response);
    //          if(response.status === 200){
    //              this.setState({
    //                  data : response.data,
    //                  redirectenrollment : true,
    //                  courses : response.data      
    //              })
    //              console.log("Courses"+response.data);
    //              console.log("books"+this.state.books);
    //              console.log("I am in if here");
    //              if(this.state.redirectenrollment)
    //                 alert("Course Enrolled Successfully !!");
    //          }else{
    //              this.setState({
    //                  authFlag : false
    //              })
    //              console.log("I am here");
    //          }
    //      });


    this.props.enrollMutation({
      variables:{
        courseid : param,
        coursedept : param1,
        coursename : param2,
        sjsuId : contsa
      }
  }).then((response)=>{
      console.log('Resposne', response.data);
      if(response.data.enrollstudent.success === true){

                 this.setState({
                     data : response.data,
                     redirectenrollment : true,
                     courses : response.data      
                 })
      }
      if(response.data.enrollstudent.duplicateUser === true){
          // this.setState({
          //     isDuplicateUser : true
          // });
      }
  });
   
 }

 handlePagination(event){

  var target = event.target;
  var id = target.id;
  var flag = true;
  if(id === "prev"){
      console.log('SI', this.state.startIndex);
      if(this.state.startIndex > 0){
          var startIndex = this.state.startIndex - this.state.pagesPerPage;
      }
      else{
          flag = false;
      }
  }        
  else{
      startIndex = this.state.startIndex + this.state.pagesPerPage;
      if(startIndex > this.state.tripDetails.length){
          flag = false;
      }
  }


  if(flag === true){

        
    var endIndex = startIndex + this.state.pagesPerPage - 1;
    var trips =this.state.tripDetails;
    var tripsResult = this.state.tripDetails.filter(function(property){
        var index = trips.indexOf(property);
        return index >= startIndex && index <= endIndex;
    });
    console.log('startomdex: ', startIndex);
    console.log('endomdex: ', endIndex);
    this.setState({
        ownerDashBoardTrips : tripsResult,
        startIndex : startIndex
    });
    }
}



handleSearchChange = (event) => {

  // var target = event.target;        
  // var value = target.value;


  this.setState({
    courseinfo : event.target.value
})

  // var filteredArray = this.state.tripDetails.filter(function (item){
  //     return item.Headline.indexOf(value) != -1;
  // });

  this.setState({
    //  ownerDashBoardTrips: filteredArray,
      startIndex: 0
  });
 // console.log('Filtered Array: ', filteredArray);
}


    render(){

        //iterate over books to create a table row
      //  let details = [];

      var course1 = this.state.courses;
      console.log("course1",course1);
        let tripdetails = this.state.books.map(book => {
          return(
              <tr>
              <td>{book.search.courseterm}</td>
              <td>{book.search.courseid}</td>
              <td>{book.search.coursename}</td>
                  <div style={{width: '30%'}}>
                  {this.renderenrollment()}
                  <button 
                    onClick = {this.enrollstudent(book.search.courseid,book.search.courseterm,book.search.coursename)} 
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
        onClick = {this.SignUpCall1} 
        class="btn btn-success" 
        type="submit">
        Term
      </button>&nbsp; &nbsp; &nbsp;

   
      {this.renderRedirect()}
      <button 
        onClick = {this.SignUpCall2} 
        class="btn btn-success" 
        type="submit">
        Course Id
      </button>&nbsp; &nbsp; &nbsp;


    {this.renderRedirect()}
    <button 
      onClick = {this.SignUpCall3} 
      class="btn btn-success" 
      type="submit">
      Course Name
    </button>
  </div> 
  <br/><br/>
  <div style={{width: '30%'}} class="form-group">
  <input 
  //  onChange = {this.coruseinfoChangeHandler} 
  onChange={this.handleSearchChange}
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
            {tripdetails}
        </tbody>
    </table>
</div> 

<div className="pagination-container center-content">
<span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
    <button className="btn btn-primary btn-lg" id="prev" onClick={this.handlePagination}>Prev</button>
</span>
<span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
    <button className="btn btn-primary btn-lg" id="next" onClick={this.handlePagination} >Next</button>
</span>                        
</div>

  </div>

        
        
        
       )
    }
}

// export default Enroll;
//export default withApollo(Enroll);  

export default compose(
  withApollo,graphql(enrollMutation,{name:"enrollMutation"})
)(Enroll);