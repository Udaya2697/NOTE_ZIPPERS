import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button,Col,Form,Row } from 'react-bootstrap'
import { Link,useHistory } from 'react-router-dom'
import ErrorMessage from '../../component/ErrorMessage'
import Loading from '../../component/Loading'
import MainScreen from '../../component/MainScreen'
import{useDispatch,useSelector} from 'react-redux'
import { register } from '../../actions/userAction'
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  
  
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const history=useHistory()
  useEffect(()=>{
    if (userInfo){
      history.push("/mynotes")
    }
  },[history,userInfo])

  const submitHandler = async(e) => {
    e.preventDefault();
    if(password !==confirmpassword){
      setMessage("Password does not match")
    }else{
      dispatch(register(name,email,password))
    }
  };
  // const postDetails = (pics) => {
  //   if (
  //     pics ===
  //     "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  //   ) {
  //     return setPicMessage("Please Select an Image");
  //   }
  //   setPicMessage(null);
  //   if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //     const data = new FormData();
  //     data.append("file", pics);
  //     data.append("upload_preset", "notezipper");
  //     data.append("cloud_name","dzjswignt");
  //     fetch("https://api.cloudinary.com/v1_1/dzjswignt/image/upload", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setPic(data.url.toString());
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     return setPicMessage("Please Select an Image");
  //   }
  // };

  
  return <MainScreen title="REGISTER">
     <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form  onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {/* {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )} */}
          {/* <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group> */}

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
  </MainScreen>
}

export default RegisterScreen
