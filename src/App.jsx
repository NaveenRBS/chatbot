import { useState } from 'react';
// import { Chatbot } from 'supersimpledev';
import { ChatData } from './components/chatData';
import { ChatInput } from './components/ChatInput';

import './App.css'

function App() {

  const [messages, setMessages] = useState([]);

  return (
    <div className="app-container">
      <ChatData messages={messages} />
      <ChatInput messages={messages} setMessages={setMessages} />

    </div>
  );
}

export default App;
