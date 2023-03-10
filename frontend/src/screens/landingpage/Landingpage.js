import React from 'react'
import { useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import './Landingpage.css'

const Landingpage = ({history}) => {
  useEffect(()=>{
    const userInfo =localStorage.getItem("userInfo");
    if (userInfo){
       history.push("/mynotes");
   }
},[history]);
  return (
    <div className='main'> 
    <Container>
        <Row>
          <div className='intro-text'>
              <div>
                  <h1 className='title'> Welcome to Note Zipper</h1>
                  <p className='subtitle'> One Safe place for all your notes.</p>
              </div>
              <div className='buttonContainer'>
                        <a href='/login'>
                          <Button size='lg' className='landingbutton '>Login</Button>
                        </a>
                        <a href='/register'>
                          <Button  size='lg' className='landingbutton' variant='outline-primary'>Sign Up</Button>
                        </a>
              </div>
          </div>
        </Row>
    </Container>
      
      </div>
  )
}

export default Landingpage

