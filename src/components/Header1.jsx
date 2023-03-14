import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, withRouter } from 'react-router-dom';


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
      <Navbar bg="primary" variant="dark" className='header'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/users'>회원목록</NavLink>       
        {email?
        <NavLink to='#' onClick={onLogout}>로그아웃</NavLink>
        :<NavLink to='/login'>로그인</NavLink>}
        {email && <NavLink to='/mypage'>{email}</NavLink>}
      </Navbar>
    </>
  )
}

export default withRouter(Header1);