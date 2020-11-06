import React, {Component} from 'react'
import firebase from '../firebase'
import {Link} from 'react-router-dom'

 class Admin extends Component{
     constructor(props) {
         super(props)
         this.ref = firebase.firestore().collection('users')
         this.unsubscribe = null
         this.state = {
             users:[]
         }
    }
    componentDidMount(){
         this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }
    onCollectionUpdate = (querySnapshot) => {
        const users = []
        querySnapshot.forEach((doc) => {
            const {fullName, mobile, email, role} = doc.data()
            users.push({
                key: doc.id,
                doc, //DocumentSnapshot
                fullName,
                mobile,
                email,
                role,
            })
       })
        this.setState({
            users
       })
   }
    render(){
           return(
               <div className='Contaniner'>
                   <div className='panel panel-default'>
                       <div className='panel-heading'>
                           <h3 className='panel-title'>Users List</h3>
                       </div>
                       <div className='panel-body'>
                          <h4><Link to='/create' className='btn btn-primary'>Add Users</Link></h4>
                          <table className='table table-stripe'>
                              <thead>
                                  <tr>
                                      <th>Full Name</th>
                                      <th>Mobile</th>
                                      <th>Email</th>
                                      <th>Role</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {this.state.users.map(user =>
                                   <tr>
                                      <td><Link to={`/show/${user.key}`}>{user.fullName}</Link></td>
                                      <td>{user.mobile}</td>
                                      <td>{user.email}</td>
                                      <td>{user.role}</td>
                                    </tr>
                                    )}
                              </tbody>
                          </table>
                       </div>
                   </div>
               </div>
           )
       } 
}
export default Admin