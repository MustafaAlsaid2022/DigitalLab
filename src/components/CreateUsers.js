import React, {Component} from 'react'
import firebase from '../firebase'
import {Link} from 'react-router-dom'

class CreateUser extends Component{
    constructor(){
        super()
        this.ref = firebase.firestore().collection('users');
        this.state = {
            fullName: '',
            mobile: '',
            email: '',
            role: ''
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name]= e.target.value
        this.setState(state)
    }
    onSubmit = (e) => {
        e.preventDefault()
        const {fullName, mobile, email,role} = this.state
        this.ref.add({
            fullName,
            mobile,
            email,
            role
        }).then((docRef) =>{
            this.setState({
                fullName:'',
                mobile:'',
                email:'',
                role:''
            })
            this.props.history.push('/admin')
        }).catch((error) => {
            console.error('Error adding document:',error)
        })
    }
    render(){
        const {fullName, mobile, email, role} = this.state
        return(
            <div className='container'>
                <div className='panel panel-default'>
                    <div className='panel-haeding'>
                        <h3 className='panel-title'>ADD USERS</h3>
                    </div>
                    <div className='panel-body'>
                        <h4><Link to='/admin' className='btn btn-primary'>Users List</Link></h4>
                          <form autoComplete='off' onSubmit={this.onSubmit}>
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
                                <div className="form-group">
                                    <input type="submit" value='Save' className="btn btn-primary btn-block" />
                                </div>
                          </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default CreateUser      