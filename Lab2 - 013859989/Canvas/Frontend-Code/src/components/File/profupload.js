import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
//import {rooturl} from '../../config/settings';
import {rooturl} from '../../AWS/settings';

//create the Navbar Component
class profupload extends Component {
    constructor(props){
        super(props);

        this.state={
            selectedfile : null,
            Profile: "",
            ProfilePreview: undefined,
        }

    }


    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

            console.log(target.files);
            var profilePhoto = target.files[0];
            var data = new FormData();
            data.append('photos', profilePhoto);
            axios.defaults.withCredentials = true;
            console.log("datasd",data);
            axios.post('http://'+rooturl+':3001/uploadprofile', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Profile Photo Name: ', profilePhoto.name);

                        //Download image
                        axios.post('http://'+rooturl+':3001/downloadprofile/' + profilePhoto.name)
                            .then(response => {
                                let imagePreview = 'data:image/jpg;base64, ' + response.data;
                                this.setState({
                                    ProfileImage: profilePhoto.name,
                                    ProfileImagePreview: imagePreview
                                })

                            }).catch((err) =>{
                                if(err){
                                    this.setState({
                                        errorRedirect: true
                                    })
                                }
                            });
                    }
                });
        }

    render(){
        return(
            <div>
            <br/>
                        <div className="form-group">
                        <label htmlFor="Profile"><strong>Course Files: </strong></label><br />
                            <input type="file" 
                            name="Profile" 
                            id="Profile" 
                            className="btn btn-lg photo-upload-btn" 
                            onChange={this.handleChange} 
                            className="btn btn-lg photo-upload-btn" 
                            />
                        </div>

                        <br/>
                        <br/>
                        <div style={{width: '30%'}}>
                       
                        <button 
                     //     onClick = {this.SignUpCall} 
                          class="btn btn-success" 
                          type="submit">
                          Sign Up
                        </button>
                      </div> 
                      </div>
        )
    }
}

export default profupload;