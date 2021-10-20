import React from 'react'
import Sidebar from './Sidebar';
import {useChats} from '../contexts/ChatProvider';

import OpenChat from './OpenChat';
const Dashboard = ({id,setID}) => {
    const{selectedChat} =useChats();
    return (
        <div style={{height:'100vh'}} className="d-flex">
            <Sidebar id={id} setID={setID}/>
            {selectedChat &&<OpenChat/>}
        </div>
    )
}

export default Dashboard
