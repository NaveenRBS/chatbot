import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css' ;

  
export function ChatInput({ messages, setMessages }) {

    const [inputText, setInputText] = useState('');

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function sendMessages() {

        const newSetMessage = [...messages,
        {
            message: inputText,
            sender: 'user',
            Key: crypto.randomUUID()
        }]

        setMessages(newSetMessage);

        const response = Chatbot.getResponse(inputText);
        setMessages([...newSetMessage,
        {
            message: response,
            sender: 'robot',
            Key: crypto.randomUUID()
        }
        ]);


        setInputText('');
    }
    return (
        <div className="chat-input-container">
            <input placeholder="Enter the Text" size="30" onChange={saveInputText} value={inputText} className="chat-input" />
            <button onClick={sendMessages} className="send-button" > Send </button>
        </div>
    );
}

