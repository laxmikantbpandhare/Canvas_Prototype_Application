import React,{Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//create the Navbar Component
class GiveQuiz extends Component {
    constructor(props){
        super(props);
        //this.question1ChangeHandler = this.question1ChangeHandler.bind(this);
        this.answer1ChangeHandler = this.answer1ChangeHandler.bind(this);
        this.answer2ChangeHandler = this.answer2ChangeHandler.bind(this);
        this.answer3ChangeHandler = this.answer3ChangeHandler.bind(this);
        this.answer4ChangeHandler = this.answer4ChangeHandler.bind(this);
        this.answer5ChangeHandler = this.answer5ChangeHandler.bind(this);
        //this.courseidChangeHandler = this.courseidChangeHandler.bind(this);

        this.state = {  
            data : 0
        }

        this.state = {
          question1: '',
          question2: '',
          question3: '',
          question4: '',
          question5: ''
        };

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
        // question1ChangeHandler = (e) => {
        //     this.setState({
        //         question1 : e.target.value
        //     })
        // }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        answer1ChangeHandler = (e) => {
            this.setState({
                answer1 : e.target.value
            })
          }

                  //SJSU ID Value change handler to update state variable with the text entered by the user
        answer2ChangeHandler = (e) => {
          this.setState({
              answer2 : e.target.value
          })
        }

                //SJSU ID Value change handler to update state variable with the text entered by the user
                answer3ChangeHandler = (e) => {
                  this.setState({
                      answer3 : e.target.value
                  })
                }

                        //SJSU ID Value change handler to update state variable with the text entered by the user
        answer4ChangeHandler = (e) => {
          this.setState({
              answer4 : e.target.value
          })
        }

                //SJSU ID Value change handler to update state variable with the text entered by the user
                answer5ChangeHandler = (e) => {
                  this.setState({
                      answer5 : e.target.value
                  })
                }

        renderRedirect = (e) => {
            if (this.state.redirect) {
              return <Redirect to='/Dashboard' />
            }
          }

          componentWillMount(){

          //  console.log(e.target.id);
            //console.log('check add zala ka book');
             //prevent page from refresh
           //  e.preventDefault();
             const data = {
                question1 : this.state.courseid
             }
             console.log(data);
             //set the with credentials to true
             axios.defaults.withCredentials = true;
             //make a post request with the user data
             axios.post('http://localhost:3000/Dashboard/quizcreation',data)
                 .then(response => {
                     console.log("Status Code : ",response);
                     if(response.status === 200){
                         this.setState({
                             data : response.data,
                             question1 : response.data[0].question1,
                             question2 : response.data[1].question1,
                             question3 : response.data[2].question1,
                             question4 : response.data[3].question1,
                             question5 : response.data[4].question1
                         })
                         console.log(response.data[0].question1);
                         console.log(response.data[1].question1);
                         console.log("testing this.state.courseid",response.data);
                         if(this.state.redirect)
                           alert("Course Created Successfully !!");
                         console.log("I am in if here");
                     }else{
                         this.setState({
                             authFlag : false
                         })
                         console.log("I am here");
                     }
                 });


                    //Download image
                    axios.post('http://localhost:3001/download-file/' + data.ProfileImage)
                        .then(response => {
                            let imagePreview = 'data:image/jpg;base64, ' + response.data;
                            this.setState({
                                ProfileImagePreview: imagePreview
                            })

});

          }
        //submit Login handler to send a request to the node backend
        QuizCreationCall = (e) => {

            console.log(e.target.id);
            console.log('check add zala ka book');
             //prevent page from refresh
             e.preventDefault();
             const data = {
                question1 : this.state.question1,
                answer1 : this.state.answer1,
                question2 : this.state.question2,
                answer2 : this.state.answer2,
                question3 : this.state.question3,
                answer3 : this.state.answer3,
                question4 : this.state.question4,
                answer4 : this.state.answer4,
                question5 : this.state.question5,
                answer5 : this.state.answer5
             }
             console.log(data);
             //set the with credentials to true
             axios.defaults.withCredentials = true;
             //make a post request with the user data
             axios.post('http://localhost:3000/Dashboard/quizsubmit',data)
                 .then(response => {
                     console.log("Status Code : ",response);
                     if(response.status === 200){
                         this.setState({
                             data : response.data,
                             redirect : true
                         })
                       //  value : response.data[0].question1;
                         console.log(response.data[0].question1);
                         console.log(response.data[1].question1);
                         console.log("testing this.state.courseid",response.data);
                         if(this.state.redirect)
                           alert("Course Created Successfully !!");
                         console.log("I am in if here");
                     }else{
                         this.setState({
                             authFlag : false
                         })
                         console.log("I am here");
                     }
                 });
         }
          
    render(){

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
                      placeholder="Question No 1" 
                      value={this.state.question1}
                      required 
                      autoFocus 
                      autoComplete 
                     />
                 </div>
                 <div  style={{width: '10%'}} class="form-group">
                        <input 
                        onChange = {this.answer1ChangeHandler} 
                        type="text" 
                        class="form-control" 
                        name="answer1" 
                        placeholder="Answer" 
                       />
                </div>

                        <div style={{width: '30%'}} class="form-group">
                        <input 
                          onChange = {this.question1ChangeHandler} 
                          type="text" 
                          class="form-control" 
                          name="question2" 
                          placeholder="Question No 1" 
                          value={this.state.question2}
                          required 
                          autoFocus 
                          autoComplete 
                         />
                     </div>
                     <div  style={{width: '10%'}} class="form-group">
                            <input 
                            onChange = {this.answer2ChangeHandler} 
                            type="text" 
                            class="form-control" 
                            name="answer2" 
                            placeholder="Answer" 
                           />
                    </div>
                            <br/>
                            <div style={{width: '30%'}} class="form-group">
                            <input 
                              onChange = {this.question1ChangeHandler} 
                              type="text" 
                              class="form-control" 
                              name="question3" 
                              placeholder="Question No 1" 
                              value={this.state.question3}
                              required 
                              autoFocus 
                              autoComplete 
                             />
                         </div>
                         <div  style={{width: '10%'}} class="form-group">
                                <input 
                                onChange = {this.answer3ChangeHandler} 
                                type="text" 
                                class="form-control" 
                                name="answer3" 
                                placeholder="Answer" 
                               />
                        </div>

                                <br/>
                                <div style={{width: '30%'}} class="form-group">
                                <input 
                                  onChange = {this.question1ChangeHandler} 
                                  type="text" 
                                  class="form-control" 
                                  name="question4" 
                                  placeholder="Question No 1" 
                                  value={this.state.question4}
                                  required 
                                  autoFocus 
                                  autoComplete 
                                 />
                             </div>
                             <div  style={{width: '10%'}} class="form-group">
                                    <input 
                                    onChange = {this.answer4ChangeHandler} 
                                    type="text" 
                                    class="form-control" 
                                    name="answer4" 
                                    placeholder="Answer" 
                                   />
                            </div>

                                    <div style={{width: '30%'}} class="form-group">
                                    <input 
                                      onChange = {this.question1ChangeHandler} 
                                      type="text" 
                                      class="form-control" 
                                      name="question5" 
                                      placeholder="Question No 1" 
                                      value={this.state.question5}
                                      required 
                                      autoFocus 
                                      autoComplete 
                                     />
                                 </div>
                                 <div  style={{width: '10%'}} class="form-group">
                                        <input 
                                        onChange = {this.answer5ChangeHandler} 
                                        type="text" 
                                        class="form-control" 
                                        name="answer5" 
                                        placeholder="Answer" 
                                       />
                                </div>
                                      {this.renderRedirect()}
                                      <button 
                                        onClick = {this.QuizCreationCall} 
                                        class="btn btn-success" 
                                        type="submit">
                                        Submit Answer
                                      </button>
                                        <br/>
                    </form>   
                </div>
            <br/>
            </div>
        )
    }
}
export default GiveQuiz;