import React,{useRef} from 'react'
import { Modal,Form,Button } from 'react-bootstrap'
import {useContacts}from '../contexts/ContactsProvider';
const NewContactModal = ({ closeModal }) => {
    const idRef = useRef();
    const nameRef = useRef();
    const {createContact}=useContacts();
    const handleSubmit=(evt)=>{
        evt.preventDefault();
        createContact(idRef.current.value,nameRef.current.value);
        closeModal();
    }
    return (
        <>
            <Modal.Header closeButton>Create Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>
                            Id
                   </Form.Label>
                        <Form.Control type="text" ref={idRef} required autoComplete="off" />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>
                            Name
                   </Form.Label>
                        <Form.Control type="text" ref={nameRef} required autoComplete="off" />
                    </Form.Group>
                    <Button type="submit" className="mr-2">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default NewContactModal
