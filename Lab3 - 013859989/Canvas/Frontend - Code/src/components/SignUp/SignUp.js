import React,{Component} from 'react';
import logo from './SJSU1.png';
import {graphql,compose} from 'react-apollo';
import {SignupMutation} from '../../queries/queries';
import {Redirect} from 'react-router';

//create the Navbar Component
class SignUp extends Component {
    constructor(props){
        super(props);
        this.sjsuidChangeHandler = this.sjsuidChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.SignUpCall = this.SignUpCall.bind(this);
        this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);

        
        this.state={
            selectedfile : null,
            ProfileImage: "",
            ProfileImagePreview: undefined,
        }
        this.state = {  
            data : 0,
            posts : false
        }

        this.state = {
            redirect : false
        }
    }

      //Define component that you wanbt to render
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

        //SJSU ID Value change handler to update state variable with the text entered by the user
        sjsuidChangeHandler = (e) => {
            const patternCheck = /^[0-9\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                sjsuid : e.target.value
            })
        }
        }

        //Name Value change handler to update state variable with the text entered by the user
        nameChangeHandler = (e) => {
            const patternCheck = /^[A-Za-z\s]*$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                name : e.target.value
            })

        }
        }

        //Email Value change handler to update state variable with the text entered by the user
        emailChangeHandler = (e) => {
            const patternCheck = /^[A-Za-z0-9\s]+@[A-Za-z\s]+.[A-Za-z\s]/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                email : e.target.value
            })
            }
        }

        //Email Value change handler to update state variable with the text entered by the user
        passwordChangeHandler = (e) => {
            // const patternCheck = /^[A-Za-z0-9\s]+@[A-Za-z\s]+.[A-Za-z\s]/;
            // if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                password : e.target.value
            })
       // }
        }

        handleCheckboxInputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
           // const isFaculty = target.isFaculty;
        
            this.setState({
                isFaculty: value
            });
          }


          renderRedirect = (e) => {
            if (this.state.redirect) {
              return <Redirect to='/' />
            }
          }

        //submit Login handler to send a request to the node backend
        SignUpCall = (e) => {

            console.log(e.target.id);
            console.log('check add zala ka book');
             //prevent page from refresh
             e.preventDefault();
             const data = {
                sjsuid : this.state.sjsuid,
                name : this.state.name,
                email : this.state.email,
                password : this.state.password,
                isFaculty : this.state.isFaculty
             }
             console.log(data);
             this.props.SignupMutation({
                variables:{
                  sjsuid: this.state.sjsuid,
                  name: this.state.name,
                  email: this.state.email,
                  password: this.state.password
                }
            }).then((response)=>{
                console.log('Resposne', response.data);
                if(response.data.signup.success === true){

                    this.setState({
                      redirect : true
                    });
                }
                if(response.data.signup.duplicateUser === true){
                    // this.setState({
                    //     isDuplicateUser : true
                    // });
                }
            });
             
         }



            // onSubmit(values) {
            //     console.log(values);
            //     this.props.createBook(values, () => {
            //       this.props.history.push("/");
            //     });
            //   }

    render(){
     //   const { handleSubmit } = this.props;
        return(
            <form onSubmit={this.SignUpCall}>
            <div>
            <div class = "container"  style={{width:'100%'}}>
                <div class="login-form">
                <div class="main-div">
                    <div class="panel">
            <img src={logo} alt="Logo" style={{width:'100%'}}/><br/><br/>
                        <div style={{width: '100%'}} class="form-group">
                           <input 
                             onChange = {this.sjsuidChangeHandler} 
                       //   component={this.renderField}
                             type="text" 
                             class="form-control" 
                             name="sjsuid" 
                             placeholder="SJSU ID" 
                             required 
                             autoFocus 
                             autoComplete 
                             pattern="[0-9]{1-20}"
                             value={this.state.sjsuid}
                            />
                        </div>
                        <br/>
                        <div style={{width: '100%'}} class="form-group">
                            <input 
                             onChange = {this.nameChangeHandler} 
                        //      component={this.renderField}
                              type="text" class="form-control" 
                              name="name" 
                              placeholder="Name" 
                              required 
                              autoFocus 
                              autoComplete 
                              pattern="[a-zA-Z]{1-20}"
                            />
                        </div>
                        <br/>
                        <div style={{width: '100%'}} class="form-group">
                            <input 
                             onChange = {this.emailChangeHandler} 
                        //component={this.renderField}
                              type="text" class="form-control" 
                              name="email" 
                              placeholder="Email" 
                              required 
                              autoFocus 
                              autoComplete 
                              pattern="[a-zA-Z0-9]{1-20}"
                            />
                        </div>
                        <br/>
                        <div style={{width: '100%'}} class="form-group">
                            <input 
                             onChange = {this.passwordChangeHandler} 
                        //   component={this.renderField}
                              type="password" 
                              class="form-control" 
                              name="password" 
                              placeholder="Password" 
                              required 
                              autoFocus 
                              autoComplete
                            />
                        </div>
                        <br/>
                        <div style={{width: '100%'}} >
                        <label>
                            <input
                              name="isFaculty"
                              type="checkbox"
                              component={this.renderField}
                              checked={this.state.isFaculty}
                              onChange={this.handleCheckboxInputChange} 
                            />
                            &nbsp; 
                            Please click here if you are a Faculty.
                        </label>
                        </div><br/>



                        <br/>
                        <br/>
                        <div style={{width: '100%'}}>
                        {this.renderRedirect()}
                        <button 
                         onClick = {this.SignUpCall} 
                          class="btn btn-success" 
                          type="submit">
                          Sign Up
                        </button>
                      </div> 
                </div> 
                </div>
                </div>
                </div>  
            </div>
            </form>

            
        );
    }
}

export default compose(
    graphql(SignupMutation,{name:"SignupMutation"})
  )(SignUp);