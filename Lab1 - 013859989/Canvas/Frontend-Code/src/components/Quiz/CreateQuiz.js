import React,{Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//create the Navbar Component
class createquiz extends Component {
    constructor(props){
        super(props);
        this.question1ChangeHandler = this.question1ChangeHandler.bind(this);
        this.answer11ChangeHandler = this.answer11ChangeHandler.bind(this);
        this.answer12ChangeHandler = this.answer12ChangeHandler.bind(this);
        this.answer13ChangeHandler = this.answer13ChangeHandler.bind(this);
        this.answer14ChangeHandler = this.answer14ChangeHandler.bind(this);
        this.handleCheckbox11InputChange = this.handleCheckbox11InputChange.bind(this);
        this.handleCheckbox12InputChange = this.handleCheckbox12InputChange.bind(this);
        this.handleCheckbox13InputChange = this.handleCheckbox13InputChange.bind(this);
        this.handleCheckbox14InputChange = this.handleCheckbox14InputChange.bind(this);
        this.question2ChangeHandler = this.question2ChangeHandler.bind(this);
        this.answer2ChangeHandler = this.answer2ChangeHandler.bind(this);
        this.question3ChangeHandler = this.question3ChangeHandler.bind(this);
        this.answer3ChangeHandler = this.answer3ChangeHandler.bind(this);
        this.question4ChangeHandler = this.question4ChangeHandler.bind(this);
        this.answer4ChangeHandler = this.answer4ChangeHandler.bind(this);
        this.question5ChangeHandler = this.question5ChangeHandler.bind(this);
        this.answer5ChangeHandler = this.answer5ChangeHandler.bind(this);
        this.courseidChangeHandler = this.courseidChangeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {  
            data : 0
        }

        this.state = {
            redirect : false
        }

        this.state = {
          description: ''//,
        //  selectedFile: '',
        };

        this.state = {
          endDate: new Date()
        };
    }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        question1ChangeHandler = (e) => {
            this.setState({
                question1 : e.target.value
            })
        }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        answer11ChangeHandler = (e) => {
            this.setState({
                answer11 : e.target.value
            })
          }
        //SJSU ID Value change handler to update state variable with the text entered by the user
        answer12ChangeHandler = (e) => {
          this.setState({
              answer12 : e.target.value
          })
        }
        //SJSU ID Value change handler to update state variable with the text entered by the user
        answer13ChangeHandler = (e) => {
          this.setState({
              answer13 : e.target.value
          })
        }
        //SJSU ID Value change handler to update state variable with the text entered by the user
        answer14ChangeHandler = (e) => {
          this.setState({
              answer14 : e.target.value
          })
        }
        //SJSU ID Value change handler to update state variable with the text entered by the user
        question2ChangeHandler = (e) => {
          this.setState({
              question2 : e.target.value
          })
      }

      //SJSU ID Value change handler to update state variable with the text entered by the user
      answer2ChangeHandler = (e) => {
          this.setState({
              answer2 : e.target.value
          })
        }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        question3ChangeHandler = (e) => {
          this.setState({
              question3 : e.target.value
          })
      }

      //SJSU ID Value change handler to update state variable with the text entered by the user
      answer3ChangeHandler = (e) => {
          this.setState({
              answer3 : e.target.value
          })
        }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        question4ChangeHandler = (e) => {
          this.setState({
              question4 : e.target.value
          })
      }

      //SJSU ID Value change handler to update state variable with the text entered by the user
      answer4ChangeHandler = (e) => {
          this.setState({
              answer4 : e.target.value
          })
        }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        question5ChangeHandler = (e) => {
          this.setState({
              question5 : e.target.value
          })
      }

      //SJSU ID Value change handler to update state variable with the text entered by the user
      answer5ChangeHandler = (e) => {
          this.setState({
              answer5 : e.target.value
          })
        }

      //SJSU ID Value change handler to update state variable with the text entered by the user
      courseidChangeHandler = (e) => {
        this.setState({
            courseid : e.target.value
        })
      }

        renderRedirect = (e) => {
            if (this.state.redirect) {
              return <Redirect to='/Dashboardfaculty' />
            }
          }

          handleCheckbox11InputChange(event) {
          //   this.setState({
          //     checkbox11 = false
          // });
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
           // const isFaculty = target.isFaculty;

            this.setState({
                checkbox11: value
            });
          }

          handleCheckbox12InputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
           // const isFaculty = target.isFaculty;
        
            this.setState({
                checkbox12: value
            });
          }

          handleCheckbox13InputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
           // const isFaculty = target.isFaculty;
        
            this.setState({
                checkbox13: value
            });
          }

          handleCheckbox14InputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
           // const isFaculty = target.isFaculty;
        
            this.setState({
                checkbox14: value
            });
          }

        //submit Login handler to send a request to the node backend
        QuizCreationCall = (e) => {

            console.log(e.target.id);
            var check = e.target.id;
            console.log(check);
            console.log('check add zala ka book');
             //prevent page from refresh
             e.preventDefault();
             const data = {
                question1 : this.state.question1,
                checkbox11 : this.state.checkbox11,
                answer11 : this.state.answer11,
                checkbox12 : this.state.checkbox12,
                answer12 : this.state.answer12,
                checkbox13 : this.state.checkbox13,
                answer13 : this.state.answer13,
                checkbox14 : this.state.checkbox14,
                answer14 : this.state.answer14,
                courseid : this.state.courseid,
                enddate : this.state.endDate
             }
             console.log(data);
             //set the with credentials to true
             axios.defaults.withCredentials = true;
             //make a post request with the user data
             axios.post('http://localhost:3000/Dashboardfaculty/quizcreation',data)
                 .then(response => {
                     console.log("Status Code : ",response);
                     if(response.status === 200){
                         this.setState({
                             data : response.data
                         })
                         console.log("testing this.state.courseid", this.state.courseid);
                         console.log("check", check);
                        this.setState({
                          question1 : '',
                          answer11 : '',
                          answer12 : '',
                          answer13 : '',
                          answer14 : '',
                          courseid : ''
                          })
                         if(check=="true"){
                           console.log("ala re ala");
                            this.setState({
                              redirect : true
                            })  
                          }
                         else{
                          console.log("ala rfe ala");
                         this.setState({
                          redirect : false
                        }) 
                      }console.log(this.state.redirect)
                         if(this.state.redirect)
                           alert("Question Created Successfully !!");
                         console.log("I am in if here");
                     }else{
                         this.setState({
                             authFlag : false
                         })
                         console.log("I am here");
                     }
                 });
         }

         handleChange(date) {
          this.setState({
            endDate: date
          });
        }

        renderSamePage = (e) => {
          if (this.state.samepage) {
            alert("You are at SJSU Canvas DashBoard Page");
            this.state.samepage = false;
            this.state.accountprofile = false;
            this.state.flagcheck = false;
            return <Redirect to='/Dashboard/quizcreation' />
          }
        }

              //submit Login handler to send a request to the node backend
              setSamePage = (e) => {
                this.state.samepage = true;
                this.state.flagcheck = false;
                 console.log("ALo baba ithe"); 
             }
          
    render(){
                //if not logged in go to login page
        //const { description, selectedFile } = this.state;
        let redirectVar = null
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
              {redirectVar}
            <br/>
              <title>Quiz Create</title>
                <div class = "container">
                    <form>
                    <div style={{width: '30%'}} class="form-group">
                    <input 
                      onChange = {this.question1ChangeHandler} 
                      type="text" 
                      class="form-control" 
                      name="question1" 
                      value={this.state.question1}
                      placeholder="Question No 1" 
                      required 
                      autoFocus 
                      autoComplete 
                      pattern="[0-9]{1-20}"
                     />
                 </div>
                        <div style={{width: '10%'}} class="form-group">
                        <label>
                        <input
                          name="checkbox11"
                          type="checkbox"
                          checked={this.state.checkbox11}
                          onChange={this.handleCheckbox11InputChange} 
                        />
                        <input 
                        onChange = {this.answer11ChangeHandler} 
                        type="text" 
                        class="form-control" 
                        name="answer11" 
                        value={this.state.answer11}
                        placeholder="Answer" 
                       />
                    </label>
                       </div>

                       <div style={{width: '10%'}} class="form-group">
                       <label>
                       <input
                         name="checkbox12"
                         type="checkbox"
                         checked={this.state.checkbox12}
                         onChange={this.handleCheckbox12InputChange} 
                       />
                       <input 
                       onChange = {this.answer12ChangeHandler} 
                       type="text" 
                       class="form-control" 
                       name="answer12" 
                       value={this.state.answer12}
                       placeholder="Answer" 
                      />
                   </label>
                      </div>
                      <div style={{width: '10%'}} class="form-group">
                      <label>
                      <input
                        name="checkbox13"
                        type="checkbox"
                        checked={this.state.checkbox13}
                        onChange={this.handleCheckbox13InputChange} 
                      />
                      <input 
                      onChange = {this.answer13ChangeHandler} 
                      type="text" 
                      class="form-control" 
                      name="answer13" 
                      value={this.state.answer13}
                      placeholder="Answer" 
                     />
                  </label>
                     </div>
                     <div style={{width: '10%'}} class="form-group">
                     <label>
                     <input
                       name="checkbox14"
                       type="checkbox"
                       checked={this.state.checkbox14}
                       onChange={this.handleCheckbox14InputChange} 
                     />
                     <input 
                     onChange = {this.answer14ChangeHandler} 
                     type="text" 
                     class="form-control" 
                     name="answer14" 
                     value={this.state.answer14}
                     placeholder="Answer" 
                    />
                 </label>
                    </div>

                        <br/>

                            <div style={{width: '10%'}} class="form-group">
                            <input 
                              onChange = {this.courseidChangeHandler} 
                              type="text" 
                              class="form-control" 
                              name="courseid" 
                              value={this.state.courseid}
                              placeholder="Course Id" 
                              required 
                              autoFocus 
                              autoComplete 
                             />
                         </div>
                        <br/>
                        
                        <div style={{width: '30%'}}>
                        {this.renderSamePage()}
                        <button 
                          onClick = {this.QuizCreationCall} 
                          class="btn btn-success" 
                          id="false"
                          type="submit">
                          More Questions
                        </button>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      {this.renderRedirect()}
                      <button 
                        onClick = {this.QuizCreationCall} 
                        class="btn btn-success" 
                        id="true"
                        type="submit">
                        Final Submit
                      </button>
                    </div> 
                        <br/>
                    </form>   
                </div>
            <br/>

            <DatePicker
            dateFormat="YYYY-MM-DD"
            selected={this.state.endDate}
            onChange={this.handleChange}
          />

            </div>
        )
    }
}
export default createquiz;