import React,{Component} from 'react'
import firebase from 'firebase'
import {Link} from 'react-router-dom'
import '../Admin.css'
import {Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

 class ShowUsers extends Component {
     constructor(props) {
         super(props) 
         this.state = {
             user: [],
             key: ''
        };
    }
    componentDidMount()  {
         const ref = firebase.firestore().collection('Users').doc(this.props.match.params.id);
           ref.get().then((doc) => {
             if(doc.exists){
                 this.setState({
                     user: doc.data(),
                     key: doc.id,
                     isLoading : false
                });
            }else {
                 console.log('No such document is here');
                }
        });
    }

delete(id){
        var desertRef  = firebase.storage().refFromURL(this.state.user.url)
        firebase.firestore().collection('Users').doc(id).delete().then(() =>{
            console.log(window.confirm('Doucement is Successfully deleted!'));
            this.props.history.push('/admin')
        }).catch((error) => {
            console.error('Error is removing document', error);
        });
        desertRef.delete().then(function(){
            console.log('file deleted')
        }).catch(function(error){
            console.log('error while deleted the file')
        });
    }
    render(){
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
                        <img src={this.state.user.url} height='200' width='200' alt=''/>
                  </div>
                  <div className='container'>
                      <div className='panel panel-default'>
                        <h3 className='panel-heading'>{this.state.user.fullName}</h3>
                      </div>
                  </div>
                  <div className='panel-body'>
                      <dl>
                          <dt>Email</dt>
                          <dd>{this.state.user.email}</dd>
                          <dt>Mobile</dt>
                          <dd>{this.state.user.mobile}</dd>
                          <dt>Role</dt>
                          <dd>{this.state.user.role}</dd>
                      </dl>
                      <Link to ={`/update/${this.state.key}`} className='btn btn-success'><i className='fas fa-pencil-alt'></i></Link>
                      <button onClick={this.delete.bind(this,this.state.key)} className='btn btn-danger'><i className='fas fa-trash-alt'></i></button>
                  </div>

                </Card>

            </div>
        )
    }

}
export default ShowUsers
