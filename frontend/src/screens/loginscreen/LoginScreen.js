import React, { useEffect, useState } from 'react'
import MainScreen from '../../component/MainScreen'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import {Row,Col} from "react-bootstrap";
import {login} from '../../actions/userAction'
import './Loginscreen.css'
import Loading from '../../component/Loading';
import ErrorMessage from '../../component/ErrorMessage';
import {useDispatch,useSelector} from 'react-redux'

const LoginScreen = ({history}) => {
const [email,setEmail]=useState("")
const [password,setPassword]=useState('')

const dispatch=useDispatch();
const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo)
      history.push("/mynotes");
    }
  }, [history, userInfo]);


const submitHandler =async (e) =>{
   e.preventDefault();
   dispatch(login(email, password));
};
    
  return(
  <MainScreen title='LOGIN'>
    <div className='logincontanier'>
   {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
    {loading && <Loading/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={(e)=> setEmail(e.target.value)}
                    />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e)=> setPassword(e.target.value)}

                    />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Submit
            </Button>
        </Form>
        <Row className='py-3'>
            <Col>
            New Customer ? <Link href="/register">Register Here</Link>
            </Col>
        </Row>
    </div>
  </MainScreen>
  )
};
export default LoginScreen
