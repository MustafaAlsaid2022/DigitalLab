import React from 'react'
import * as ROUTES from './constants/routes'
import { Navbar, Nav} from 'react-bootstrap'


const Navigation = () => (
   <Navbar collapseOnSelect expand="lg" fixed="top"  bg="primary" variant="dark">
   <Navbar.Brand >e-kunskaps</Navbar.Brand>
   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
   <Navbar.Collapse id="responsive-navbar-nav">
     <Nav className="mr-auto">
       <Nav.Link href={ROUTES.HOME}>Home</Nav.Link>
       <Nav.Link href={ROUTES.ADMIN}>Admin</Nav.Link>
       <Nav.Link href={ROUTES.SETTINGS}>Settings</Nav.Link>
       <Nav.Link href={ROUTES.PROFILE}>Profile</Nav.Link>
     </Nav>
     <Nav>
       <Nav.Link href={ROUTES.SIGN_UP}>Sign Up</Nav.Link>
       <Nav.Link href={ROUTES.LOGIN}> Sign In</Nav.Link>
    </Nav>
   </Navbar.Collapse>
 </Navbar>
)
export default Navigation