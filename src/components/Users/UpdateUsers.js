import React, {Component} from 'react'
import firebase from '../../firebase'
import {Link} from 'react-router-dom'
import '../Admin.css'
import {Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class UpdateUsers extends Component{
    constructor(props) {
        super(props)
        this.state = {
            key:'',
            fullName:'',
            mobile:'',
            email: '',
            role:'',
            url:'',
            image: null
        };
    }
    componentDidMount() {
          const ref = firebase.firestore().collection('Users').doc(this.props.match.params.id);
            ref.get().then((doc) =>{
              if(doc.exists){
                  const document = doc.data();
                  this.setState({
                      key: doc.id,
                      fullName: document.fullName,
                      mobile: document.mobile,
                      email: document.email,
                      role: document.role,
                      url: document.url
                  });
               }else {
                   console.log('No such document!');
            }
        });
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value; 
        this.setState({document: state});
    }
    handleChange = (e) => {
        if(e.target.files[0]){
            this.setState({
                image: e.target.files[0]
            })
        }
        console.log(e.target.files[0])
    }
    handleUpload = (e) => {
        const {image, url} = this.state;
        var desertRef = firebase.storage().refFromURL(url)
        const uploadTask = firebase.storage().ref(`images/${image.name}`).put(this.state.image)
        uploadTask.on('state_changed',(snapshot)=>{console.log('snapshot')},
        (error)=>{console.log(error);},
        ()=>{firebase.storage().ref('images').child(image.name).getDownloadURL().then(url =>{this.setState({url})})})
         
        desertRef.delete().then(function(){
             console.log('file deleted')
         }).catch(function(error){
             console.log('error while deleting the file')
        });
    }
    onSubmit  = (e) => {
        e.preventDefault();
       const {fullName, mobile, email, role, url} = this.state;
       const updateRef = firebase.firestore().collection('Users').doc(this.state.key);
        updateRef.set({
           fullName,
           mobile,
           email,
           role,
           url 
        }).then((docRef) => {
            this.setState({
                key:'',
                fullName:'',
                mobile:'',
                email:'',
                role:'',
                url:''
            });
            this.props.history.push('/show/'+ this.props.match.params.id)
        }).catch((error) =>{
            console.error('Error updating document:', error);
        });
    }
    render() {
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
                  <div className='upload-data'>
                        <img src={this.state.url} height='200' width='200' alt=''/>
                  </div>
                  <div className='upload-btn-wrapper'>
                      <button className='file-btn'>Choose a file</button>
                      <input type= 'file'name='myfile' onChange={this.handleChange} />    
                    </div>
                    <div className='Buttons'>
                        <button className='Submit-Button' onClick={this.handleUpload}>Upload Image First</button>
                    </div>
                    <div className='container'>
                     <div className='panel panel-default'>
                       <div className='panel-body'>
                          <form onSubmit = {this.onSubmit}>
                            <div className='form-group input-group'>
                              <div className='input-group-prepend'>
                                <div className='input-group-text'>
                                  <i className='fas fa-user'></i>
                                </div>
                               </div>
                                <input className="form-control" name="fullName" placeholder="Full Name" type='text'
                                   value={this.state.fullName}   onChange={this.onChange} />
                            </div>
                            <div className="form-row">
                              <div className="form-group input-group col-md-6">
                                 <div className="input-group-prepend">
                                    <div className="input-group-text">
                                       <i className="fas fa-mobile-alt"></i>
                                    </div>
                                  </div>
                                     <input className="form-control" name="mobile" placeholder="Mobile" type='text'
                                        value={this.state.mobile} onChange={this.onChange} />
                                </div>
                                <div className="form-group input-group col-md-6">
                                   <div className="input-group-prepend">
                                      <div className="input-group-text">
                                          <i className="fas fa-envelope"></i>
                                       </div>
                                    </div>
                                      <input className="form-control" name="email" placeholder="Email" type='text'
                                          value={this.state.email} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className='form-group input-group'>
                              <div className='input-group-prepend'>
                                <div className='input-group-text'>
                                   <i className='fas fa-user'></i>
                                </div>
                               </div>
                                  <input className="form-control" name="role" placeholder="role" type='text'
                                        value={this.state.role}   onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <input type="submit" value='Update'  className="btn btn-primary btn-block" />
                            </div>
                          </form>
                        </div> 
                      </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default UpdateUsers