import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import {app} from '../firebase'
import {query,collection,getDoc,getFirestore,onSnapshot} from 'firebase/firestore'

const Users = () => {
  const [loading,setLoading] = useState(false);

  const db = getFirestore(app);
  const [users,setUsers] = useState(null);

  const getUsers = async() =>{
    setLoading(true);
      const q = query(collection(db,'users'));

    onSnapshot(q,(result)=>{
      let rows=[];
      result.forEach(doc => {
        console.log(doc.data())
        rows.push(doc.data());
      });
      setLoading(false);
      setUsers(rows);
    });

  }

  useEffect(()=>{
      getUsers();
  },[])

  if(users===null){
      return<h1>Loading.....</h1>
  }
  return (
    <Row className='justify-text-center'>
        <h1 style={{marginTop:'50px'}}>회원목록</h1>
        {users.map(user=>
            <Card key={user.email} style={{marginBottom:'10px', padding:'0px 20px'}} className="m-1">
              <Card.Body className='user'>
                  <Row>
                    <Col xs={2}>
                    <img src={user.photo?user.photo:'https://via.placeholder.com/120X150'} style={{width:'100px'}} />
                    </Col>
                    <Col xs={10}>
                      <div>{user.name}[{user.email}]</div>
                      <div>{user.address}</div>
                    </Col>
                  </Row>
              </Card.Body>
            </Card>
          )}
    </Row>
  )
}

export default Users