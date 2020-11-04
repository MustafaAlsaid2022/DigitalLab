import React,{ useState, useEffect} from 'react'

const Users = (props) => {
    const initialValues = {
        fullName:'',
        mobile:'',
        email:'',
        role:''
    }
    var[values, setValues] = useState(initialValues)

    useEffect(() => {
         if(props.currentId === '')
            setValues({...initialValues})
        else
            setValues({ ...props.userObjects[props.currentId]}) 
    },[props.currentId, props.userObjects])
   
    const handleInputChange = e => {
        var {name,value} = e.target
        setValues({
            ...values, [name]: value
        })
    }
    const handleFormSubmit = e => {
        e.preventDefault()
        props.addOrEdit(values)
    }
    
    return(
        <form autoComplete='off' onSubmit={handleFormSubmit}>
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <div className='input-group-text'>
                        <i className='fas fa-user'></i>
                    </div>
                </div>
                <input className='form-control' name='fullName' placeholder='Full Name'
                  value={values.fullName} onChange={handleInputChange} />
            </div>
            <div className='form-row'>
                <div className='form-group input-group col-md-6'>
                    <div className='input-group-prepend'>
                        <div className='input-group-text'>
                            <i className='fas fa-mobile-alt'></i>
                        </div>
                    </div>
                    <input className='form-control' name='mobile' placeholder='Mobile'
                      value={values.mobile} onChange={handleInputChange} />
                </div>
                <div className='form-group input-group col-md-6'>
                <div className='input-group-prepend'>
                        <div className='input-group-text'>
                            <i className='fas fa-envelope'></i>
                        </div>
                    </div>
                    <input className='form-control' name='email' placeholder='Email'
                      value={values.email} onChange={handleInputChange} />
                </div>
            </div>
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <div className='input-group-text'>
                        <i className='fas fa-user'></i>
                    </div>
                </div>
                <input className='form-control' name='role' placeholder='Role'
                  value={values.role} onChange={handleInputChange} />
            </div>

        </form>
    )
}
export default Users