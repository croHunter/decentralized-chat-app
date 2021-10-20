import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useChats } from '../contexts/ChatProvider'

const NewChatModal = ({closeModal}) => {
    const { contacts } = useContacts();
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { createChat } = useChats();

    const handleCheckboxChange = (contactId) => {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => {
                    return contactId !== prevId;
                })
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        createChat(selectedContactIds);
        closeModal();
    }
    return (
        <>
            <Modal.Header closeButton>Create Chat</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    {contacts.map(contact => {
                       return <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckboxChange(contact.id)}

                            />
                        </Form.Group>
                    })}
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default NewChatModal
