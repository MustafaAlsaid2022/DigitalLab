import React,{Component} from 'react'
import firebase from 'firebase'
import {Link} from 'react-router-dom'
 class ShowUsers extends Component {
     constructor(props) {
         super(props) 
         this.state = {
             user: {},
             key: ''
         };
     }
    componentDidMount()  {
         const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);

          ref.get().then((doc) => {
             if(doc.exists){
                 this.setState({
                     user: doc.data(),
                     key: doc.id,
                     isLoading : false
                 });
             }else {
                 console.log('No such document');
             }
         });
    }

    delete(id){
        firebase.firestore().collection('users').doc(id).delete().then(() =>{
            console.log(window.confirm('Doucement Successfully deleted!'));
            this.props.history.push('/admin')
        }).catch((error) => {
            console.error('Error removing document',error)
        })
    }
    render(){
        return(
            <div className='container'>
                <div className='panel penel-default'>
                    <div className='panel-heading'>
                        <h4><Link to='/admin'>Users List</Link></h4>
                          <h3 className='panel-title'>{this.state.user.fullName}</h3>
                    </div>
                    <div className='panel-body'>
                        <dl>
                            <dt>Mobile</dt>
                            <dd>{this.state.user.mobile}</dd>
                            <dt>Email</dt>
                            <dd>{this.state.user.email}</dd>
                            <dt>Role</dt>
                            <dd>{this.state.user.role}</dd>
                        </dl>
                        <Link to={`/update/${this.state.key}`} className='btn text-primary'>
                            <i className='fas fa-pencil-alt'></i></Link> 
                            <a className='btn text-danger' onClick={this.delete.bind(this, this.state.key)}>
                                        <i className='fas fa-trash-alt'></i></a>    
                    </div>
                </div>
            </div>
        )
    }

}
export default ShowUsers
