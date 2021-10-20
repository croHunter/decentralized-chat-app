import Login from './Login';
import React from 'react';
import useLocalStorage from '../hook/useLocalStorage';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ChatProvider } from '../contexts/ChatProvider';
import { SocketProvider } from '../contexts/SocketProvider';
function App() {
  const [id, setID] = useLocalStorage('id');
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ChatProvider id={id}>
          <Dashboard id={id} setID={setID} />
        </ChatProvider>
      </ContactsProvider>
    </SocketProvider>

  );
  return (id ? dashboard : <Login onSubmitId={setID} />);
}

export default App;
