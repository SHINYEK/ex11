import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import {app} from '../firebase'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,setDoc,doc} from 'firebase/firestore'

const Join = ({history}) => {
    const auth = getAuth(app);
    const db = getFirestore(app);


    const[form,setForm] = useState({
        email:'user01@email.com',
        password:'12341234'
    })
    const {email,password} = form;

    const onChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit =(e)=>{
        e.preventDefault();
        console.log(form);
        createUserWithEmailAndPassword(auth,email,password)
        .then((success)=>{
            if(!window.confirm("회원 가입하시겠습니까?")) return;
            alert("회원가입 성공!");
            //유저정보 저장
            setDoc(doc(db,'/users',email),{
                email:email,
                name:'',
                address:'',
                photo:''
            })
            history.push('/login')
        })  
        .catch((error)=>{
            alert("회원가입 실패!"+error.message)
        })
    }
  return (
    <Row className='m-5 justify-content-center'>
        <Col md={4}>
            <Card>
                <Card.Title className='p-3 text-center'>
                    <h2 >회원가입</h2>
                </Card.Title>
                <Card.Body>
                    <Form className='mb-2' onSubmit={onSubmit}>
                        <Form.Control placeholder='Email' className='mb-2' value={email} name='email' onChange={onChange}/>
                        <Form.Control placeholder='password' className='mb-2' type='password' value={password} name='password' onChange={onChange}/>
                        <Button style={{width:'100%'}} className='mb-2' type='submit'>회원가입</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default Join