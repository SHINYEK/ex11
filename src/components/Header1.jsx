import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { withRouter } from 'react-router-dom';

const Header1 = ({history}) => {
    const onLogout = (e)=>{
        e.preventDefault();
        sessionStorage.removeItem('email')
        history.push('/');
    }
    let email = sessionStorage.getItem('email');

  return (
    <>
    <img src="https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/e6bbfa0b-004d-4b9c-923b-02c4521af50d.jpg" style={{width:'100%'}}/>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Logo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">회원목록</Nav.Link>
            {email ? <Nav.Link href="#" onClick={onLogout}>로그아웃</Nav.Link>
            :
            <Nav.Link href="/login">로그인</Nav.Link>}                 
            {email && <Nav.Link href="#">{email}</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default withRouter(Header1);