import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import {v4 as uuidV4}from 'uuid';
const Login = ({onSubmitId}) => {
    const idRef = useRef("");
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmitId(idRef.current.value);
        idRef.current.value="";

    }
    const createNewId=()=>{
        idRef.current.value=uuidV4();
    }
    return (
        <Container className="align-items-center d-flex" style={{height:"100vh"}} >
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group controlId="formBasicText">
                    <Form.Label>
                        Enter your Id
                   </Form.Label>
                    <Form.Control type="text" ref={idRef} required autoComplete="off" />
                </Form.Group>
                <Button type="submit" className="mr-2">Login</Button>
                <Button onClick={createNewId} variant="dark">Create Id</Button>
            </Form>
        </Container>
    )
}

export default Login
