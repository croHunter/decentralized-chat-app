import React from 'react'
import { useChats } from '../contexts/ChatProvider';
import { ListGroup } from 'react-bootstrap';
const Chat = () => {
    const { chats ,selectChatIndex} = useChats();
    return (
        <ListGroup variant="flush">
            {chats.map((chat, index) =>
                (<ListGroup.Item 
                key={index}
                action
                onClick={()=>selectChatIndex(index)}
                active={chat.selected}
                >
                    {chat.recipients.map(r => r.name).join(",")}
                </ListGroup.Item>)
            )}
        </ListGroup>
    )
}

export default Chat
