import React from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Signup from './Signup'
import Profile from './Profile'
import Login from './Login'
import Navigation from './Navigation'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import Home from './Home'
import Admin from './Admin'
import Setting from './Setting'
import * as ROUTES from './constants/routes'
import CreateUsers from './Users/CreateUsers'
import UpdateUsers from './Users/UpdateUsers'
import ShowUsers from './Users/ShowUsers'
import NotFound from './NotFound'



function App() {
  return(
       <Router>
         <div>
           <Navigation />
              <AuthProvider>
                <Switch>
                  <Route exact path={ROUTES.HOME} component={Home} />
                  <Route exact path={ROUTES.ADMIN} component={Admin} />
                  <Route exact path={ROUTES.SETTINGS} component={Setting} />
                  <Route exact path='/update-profile' component= {UpdateProfile} />
                  <Route exact path={ROUTES.SIGN_UP} component={Signup} /> 
                  <Route path={ROUTES.LOGIN} component={Login} />
                  <Route path='/forgot-password' component={ForgotPassword} />
                  <Route path={ROUTES.PROFILE} component={Profile} />
                  <Route path='/create' component={CreateUsers} />
                  <Route path='/update/:id' component={UpdateUsers} />
                  <Route path='/show/:id' component={ShowUsers} />
                  <Route  component={NotFound} />
                  </Switch>
              </AuthProvider>
          </div>  
        </Router>

  );
}

export default App;
