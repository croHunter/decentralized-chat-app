import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Chat from './Chat';
import Contact from './Contact';
import NewChatModal from './NewChatModal';
import NewContactModal from './NewContactModal';


const CONTACT_KEY = 'contacts';
const CHAT_KEY = 'chat'
const Sidebar = ({ id, setID }) => {
    const [activeKey, setActiveKey] = useState(CHAT_KEY);
    const [modalOpen, setModalOpen] = useState(false);
    const chatOpen = activeKey === CHAT_KEY;//true or false
    const closeModal = () => {
        setModalOpen(false);
    }
    return (
        <div style={{ width: '250px' }} className="d-flex flex-column" >
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CHAT_KEY} >
                            Conversation
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACT_KEY}>
                            Contacts
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CHAT_KEY}>
                        <Chat />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACT_KEY}>
                        <Contact />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your ID:<span className="text-muted">{id}</span>
                </div>
                <Button className="rounded-0" onClick={() => setModalOpen(true)} >New {chatOpen ? "Chat" : "Contact"}</Button>
                <Button onClick={() => { setID(""); }} style={{ marginTop: "10px" }} className="rounded-0">Logout</Button>
            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal} >
                {chatOpen ? <NewChatModal closeModal={closeModal} /> : <NewContactModal closeModal={closeModal} />}
            </Modal>
        </div>
    )
}

export default Sidebar
