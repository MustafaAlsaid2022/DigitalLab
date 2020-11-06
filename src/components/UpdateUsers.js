import React, {Component} from 'react'
import firebase from '../firebase'
import {Link} from 'react-router-dom'

class UpdateUsers extends Component{
    constructor(props) {
        super(props)
        this.state = {
            key:'',
            fullName:'',
            mobile:'',
            email: '',
            role:''
        }
    }
    componentDidMount() {
          const ref = firebase.firestore().collection('users').doc(this.props.match.params.id)
          ref.get().then((doc) =>{
              if(doc.exists){
                  const user = doc.data()
                  this.setState({
                      key: doc.id,
                      fullName:user.fullName,
                      mobile:user.mobile,
                      email:user.email,
                      role:user.role
                  })
               }else {
                   console.log('No such document!')
               }
          })
    }
    ocChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value 
        this.setState({user:state})
    }
    onSubmit  = (e) => {
        e.preventDefault()
        const {fullName, mobile, email, role} = this.state

        const updateRef = firebase.firestore().collection('users').doc(this.state.key)
        updateRef.set({
           fullName,
           mobile,
           email,
           role 
        }).then((docRef) => {
            this.setState({
                key:'',
                fullName:'',
                mobile:'',
                email:'',
                role:''
            })
            this.props.history.push('/showusers/'+ this.props.match.params.id)
        }).catch((error) =>{
            console.error('Error updating document:',error)
        })
    }
    render() {
        return(
            <div className='container'>
                <div className='panel panel-default'>
                    <div className='panel-haeding'>
                        <h3 className='panel-title'>EDIT USERS</h3>
                    </div>
                    <div className='panel-body'>
                        <h4><Link to={`/show/${this.state.key}`} className='btn btn-primary'>Users List</Link></h4>
                          <form autoComplete='off' onSubmit={this.onSubmit}>
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
                                    <input type="submit" value='Update' className="btn btn-primary btn-block" />
                                </div>
                          </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default UpdateUsers