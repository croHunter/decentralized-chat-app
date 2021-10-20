import React, { useContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hook/useLocalStorage';
import { useContacts } from '../contexts/ContactsProvider';
import { useSocket } from '../contexts/SocketProvider';
const ChatContext = React.createContext();
export function useChats() {
    return useContext(ChatContext)
}
export const ChatProvider = ({ id, children }) => {
    const [chats, setChat] = useLocalStorage('chats', []);
    const [selectedChatIndex, setSelectedChatIndex] = useState(0);
    const { contacts } = useContacts();
    const socket = useSocket()
    function createChat(recipients) {
        setChat(prev => {
            return [...prev, { recipients, messages: [] }];
        })
    }
    const addMessageToChat = useCallback(({ recipients, text, sender }) => {
        setChat(prevChat => {
            let madeChange = false;
            const newMessage = { sender, text };
            const newChat = prevChat.map(chat => {
                if (arrayEquality(chat.recipients, recipients)) {
                    madeChange = true
                    return {
                        ...chat, messages: [...chat.messages, newMessage]
                    }
                }
                return chat;
            })

            if (madeChange) {
                return newChat;
            } else {
                return [...prevChat, { recipients, messages: [newMessage] }]
            }
        })
    }, [setChat]);

    useEffect(() => {
        if (socket == null) return;
        console.log("socket :"+socket);
        socket.on('receive-message', addMessageToChat);
        return () => socket.off('receive-message');
    }, [socket, addMessageToChat]);

    function sendMessage(recipients, text) {
        socket.emit('send-message', { recipients, text })
        addMessageToChat({ recipients, text, sender: id })
    }

    const formattedChats = chats.map((chat, index) => {
        const recipients = chat.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient;
            });
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name }
        });
        const messages = chat.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender;
            });
            const name = (contact && contact.name) || message.sender;
            const fromMe = id === message.sender;
            return { ...message, senderName: name, fromMe }
        });
        const selected = index === selectedChatIndex;
        return { ...chat, messages, recipients, selected }
    });
    const value = {
        chats: formattedChats,
        selectedChat: formattedChats[selectedChatIndex],
        sendMessage,
        selectChatIndex: setSelectedChatIndex,
        createChat
    }
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false;
    a.sort()
    b.sort()
    return a.every((element, index) => {
        return element === b[index]
    })
}