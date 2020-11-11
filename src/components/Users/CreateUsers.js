import React, {Component} from 'react'
import firebase from '../../firebase'
import {Link} from 'react-router-dom'
import '../Admin.css'
import {Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class CreateUser extends Component{
    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('Users');
        this.state = {
            fullName: '',
            mobile: '',
            email: '',
            role: '',
            url: '',
            image: null,
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    handleChange = (e) => {
        if(e.target.files[0]){
            this.setState({
                image: e.target.files[0]
            })
        }
        console.log(e.target.files[0]);
    }
    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = firebase.storage().ref(`images/${image.name}`).put(this.state.image)
        uploadTask.on('state_changed',(snapshot)=>{console.log('snapshot')},
        (error)=>{console.log(error);},
        ()=>{firebase.storage().ref('images').child(image.name).getDownloadURL().then(url =>this.setState({url}))})
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {fullName, mobile, email, role} = this.state
        this.ref.add({
            fullName,
            mobile,
            email,
            role,
            url: this.state.url
        }).then((docRef) =>{
            this.setState({
                fullName:'',
                mobile:'',
                email:'',
                role:'',
                url: ''
            });
            this.props.history.push('/admin')
        }).catch((error) => {
            console.error('Error adding document:',error)
        });
    }
    render(){
        const {fullName, mobile, email, role} = this.state
        const cardStyles = {
            width: '40rem',
            height: 'auto',
            backgroundColor: 'white',
            margin: 'auto',
            display: 'block',
            marginTop: '60px',
            opacity: '0.5',
            paddingTop:'10px',
            paddingleft:'20px',
            paddingRight:'20px',
            borderStyle:'outset',
            borderLeft:'50px solid black',
            borderRadius:'20px'
           }
        return(
            <div>
                <Card style={cardStyles}>
                 <div className='Buttons'>
                     <Link to='/admin'>
                     <button className='Edit-Button'>Show Users</button>
                     </Link>
                  </div>
                 <div>
                  <div className='form-group input-group'>
                     <div className='input-group-prepend'>
                        <div className='input-group-text'>
                            <i className='fas fa-user'></i>
                        </div>
                      </div>
                        <input className="form-control" name="fullName" placeholder="Full Name" type='text'
                                 value={fullName}   onChange={this.onChange} />
                   </div>
                   <div className="form-row">
                      <div className="form-group input-group col-md-6">
                         <div className="input-group-prepend">
                            <div className="input-group-text">
                               <i className="fas fa-mobile-alt"></i>
                            </div>
                          </div>
                           <input className="form-control" name="mobile" placeholder="Mobile" type='text'
                                        value={mobile} onChange={this.onChange} />
                      </div>
                      <div className="form-group input-group col-md-6">
                         <div className="input-group-prepend">
                             <div className="input-group-text">
                                <i className="fas fa-envelope"></i>
                              </div>
                          </div>
                            <input className="form-control" name="email" placeholder="Email" type='text'
                                value={email} onChange={this.onChange} />
                       </div>
                    </div>
                    <div className='form-group input-group'>
                        <div className='input-group-prepend'>
                          <div className='input-group-text'>
                             <i className='fas fa-user'></i>
                          </div>
                        </div>
                          <input className="form-control" name="role" placeholder="role" type='text'
                                 value={role}   onChange={this.onChange} />
                    </div>
                 </div> 
                    <div className='upload-btn-wrapper'>
                      <button className='file-btn'>Choose a file</button>
                      <input type= 'file' name='myfile' onChange={this.handleChange} />    
                    </div>
                    <div className='upload-data'>
                        <img src={this.state.url} height='200' width='200' alt=''/>
                    </div>
                    <div className='Buttons'>
                        <button className='Submit-Button' onClick={this.handleUpload}>Upload Image First</button>
                        <button className='Submit-Button' onClick={this.onSubmit}>Save All</button>
                    </div>
                </Card>
            </div>
            
        )
    }
}
export default CreateUser      