import React, {Component} from 'react'
import firebase from '../firebase'
import './Admin.css'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card} from 'react-bootstrap'


 class Admin extends Component{
     constructor(props) {
         super(props)
         this.ref = firebase.firestore().collection('Users')
         this.unsubscribe = null;
         this.state = {
             users:[]
        };
    }
    componentDidMount(){
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }
    onCollectionUpdate = (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
            const {fullName, mobile, email, role, url} = doc.data();
            users.push({
                key: doc.id,
                doc, //DocumentSnapshot
                fullName,
                mobile,
                email,
                role,
                url
            });
       });
        this.setState({
            users
       });
   }
   render(){
       const cardStyles = {
        width: 'auto',
        height: '40rem',
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
                     <Link to='/create'>
                     <button className='Add-Button'>Add Users</button>
                     </Link>
                     </div>
                     <div className='container'>
                         <div className='panel panel-heading'>
                             <h3 className='panel heading'>Users Details</h3>
                         </div>
                      </div>
                      <div className='panel-body'>
                          <table className='table table-stripe'>
                              <thead>
                                  <tr>
                                      <th>Full Name</th>
                                      <th>Mobile</th>
                                      <th>Email</th>
                                      <th>Role</th>
                                      <th>Image</th>
                                  </tr>
                              </thead>
                              <tbody>
                                 {this.state.users.map(user =>
                                <tr>
                                    <td><Link to={`/show/${user.key}`}>{user.fullName}</Link></td>
                                    <td>{user.mobile}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td><img src={user.url} width='100px' height= '100px' alt=''></img></td>
                                </tr>
                                )}
                              </tbody>
                          </table>
                      </div>
                   </Card>
               </div>
           )
       } 
}

export default Admin