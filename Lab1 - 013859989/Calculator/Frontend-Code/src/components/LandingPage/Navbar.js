import React,{Component} from 'react';
import axios from 'axios';

//create the Navbar Component
class Navbar extends Component {

    constructor(props){
        super(props);
        this.firstInputChangeHandler = this.firstInputChangeHandler.bind(this);
        this.secondInputChangeHandler = this.secondInputChangeHandler.bind(this);
        this.performCalculation = this.performCalculation.bind(this);

        this.state = {  
            data : 0
        }
    }

        //first Input Value change handler to update state variable with the text entered by the user
        firstInputChangeHandler = (e) => {
            const patternCheck = /^[0-9\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                firstInput : e.target.value
            })
        }
        }

        //Second input Value change handler to update state variable with the text entered by the user
        secondInputChangeHandler = (e) => {
            const patternCheck = /^[0-9\b]+$/;
            if(e.target.value === '' || patternCheck.test(e.target.value)){
            this.setState({
                secondInput : e.target.value
            })
            }
        }

        //submit Login handler to send a request to the node backend
        performCalculation = (e) => {

            console.log(e.target.id);
             //prevent page from refresh
             e.preventDefault();
             const data = {
                firstInput : this.state.firstInput,
                secondInput : this.state.secondInput,
                id : e.target.id
             }
             console.log(data);
             //set the with credentials to true
             axios.defaults.withCredentials = true;
             //make a post request with the user data
             axios.post('http://localhost:3000/addition',data)
                 .then(response => {
                     console.log("Status Code : ",response);
                     if(response.status === 200){
                         this.setState({
                             data : response.data
                         })
                     }else{
                         this.setState({
                             authFlag : false
                         })
                         console.log("I am here");
                     }
                 });
         }

    render(){

        return(
            <div>
            <br/>
                <div class = "container">
                <div class="login-form">
                <div class="main-div">
                    <div class="panel">
                    <form>
                        <div style={{width: '100%'}} class="form-group">
                            <input onChange = {this.firstInputChangeHandler} type="number" class="form-control" name="firstInput" placeholder="Input Number One" required autoFocus autoComplete pattern="[0-9]{1-20}"/>
                        </div>
                        <br/>
                        <div style={{width: '100%'}} class="form-group">
                            <input onChange = {this.secondInputChangeHandler} type="number" class="form-control" name="secondInput" placeholder="Input Number Two" required autoFocus autoComplete pattern="[0-9]{1-20}"/>
                        </div>

                        <br/>
                        <div style={{width: '100%'}} class="form-group">
                        <input  type="number" class="form-control" name="secondInput" placeholder="Input Number Two" value={this.state.data}/>
                    </div>
                    <br/>

                        <div style={{width: '100%'}}>
                            <button onClick = {this.performCalculation} class="btn btn-success" type="submit" id="+">+</button> &nbsp; &nbsp; &nbsp;
                            <button onClick = {this.performCalculation} class="btn btn-success" type="submit" id="-">-</button> &nbsp; &nbsp; &nbsp;
                            <button onClick = {this.performCalculation} class="btn btn-success" type="submit" id="*">*</button> &nbsp; &nbsp; &nbsp;
                            <button onClick = {this.performCalculation} class="btn btn-success" type="submit" id="/">/</button>
                        </div> 
                    </form>
                </div>   
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Navbar;