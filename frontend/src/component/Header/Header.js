import Container from 'react-bootstrap/Container';
import React, { useEffect } from "react";
//import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import '../../../src/index.css'
import { Link ,useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";
import {logout} from '../../actions/userAction'
const Header =({setSearch})=>{
  const history=useHistory() 
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/')
  };

  useEffect(() => {}, [userInfo]);
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">Notes-Zipper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='m-auto'>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e)=> setSearch(e.target.value)}
                />
            </Form>
          </Nav>
          {userInfo?<Nav>
            <Nav.Link href="/mynotes">
            My Notes
            </Nav.Link>
            <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  
              onClick={logoutHandler}
              >Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>:(<Nav>
            {" "}
          <Nav.Link href="/login">
            Login
            </Nav.Link></Nav>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Header;