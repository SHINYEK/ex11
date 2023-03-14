import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import {app} from '../firebase';
import {getFirestore,doc,setDoc, getDoc} from 'firebase/firestore'
import {getStorage,uploadBytes,ref,getDownloadURL} from 'firebase/storage'

const Mypage = () => {
    const db = getFirestore(app);
    const storage = getStorage(app);
    const [loading,setLoading] = useState(false);
    const [image,setImage] = useState('https://via.placeholder.com/120X150');
    const [file,setFile] = useState(null);

    const [form,setForm] = useState({
        email:sessionStorage.getItem('email'),
        name:'무기명',
        address:'인천',
        photo:''
    })

    const{email,name,address,photo} = form;

    //정보 가져오는 함수
    const getInfo = async() =>{
        setLoading(true);
        const result = await getDoc(doc(db,'users',email));
        console.log(result.data());
        setForm(result.data());
        setImage(result.data().photo);
        setLoading(false);
    }

    useEffect(()=>{
        getInfo();
    },[])

    //파일변경 -> 이미지 변경
    const onChangeFile = (e) =>{
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    //input 상자 내용 변경
    const onChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = async(e) =>{
        e.preventDefault();
        if(!window.confirm("회원 정보를 수정하시겠습니까?")) return;

        setLoading(true)
        //이미지업로드 - storage가 필요 import
        let url ='';
        if(file !== null){ //파일이 존재하면 업로드
            const fileName = `images/${Date.now()}_${file.name}`
            const result = await uploadBytes(ref(storage,fileName),file);
            url = await getDownloadURL(result.ref);
        }
        
        //정보수정
        await setDoc(doc(db,'users',email),{...form,photo:url});
        setLoading(false);
    }

    if(loading) return <h1>Loading...</h1>
  return (
    <Row className='justify-content-center my-5'>
        <Col md={4}>
            <Card>
                <Card.Title>
                    <h3 style={{marginTop:'30px'}}>My Page</h3>
                </Card.Title>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Control className='my-2' placeholder='이름' name='name' value={name} onChange={onChange}/>
                        <Form.Control className='my-2' placeholder='주소' name='address' value={address} onChange={onChange}/>
                        <img src={image?image:"https://via.placeholder.com/100X120"} style={{ marginBottom:'10px', width:'150px', border:'solid 5px gray'}} />
                        <Form.Control className='my-2' type='file' onChange={onChangeFile}/>
                        <Button type='submit'>정보수정</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default Mypage