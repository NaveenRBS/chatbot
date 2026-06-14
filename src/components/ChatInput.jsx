import { useState } from 'react';
// import { Chatbot } from 'supersimpledev';
import './ChatInput.css' ;

  
export function ChatInput({ messages, setMessages }) {

    const [inputText, setInputText] = useState('');

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    async function sendMessages() {

    if (!inputText.trim()) return; 

        const newSetMessage = [...messages,
        {
            message: inputText,
            sender: 'user',
            Key: crypto.randomUUID()
        }]

        setMessages(newSetMessage);
        setInputText('');

        // const response = Chatbot.getResponse(inputText);
        // setMessages([...newSetMessage,
        // {
        //     message: response,
        //     sender: 'robot',
        //     Key: crypto.randomUUID()
        // }
        // ]);

        try {
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: inputText })
        });

        const data = await response.json();

        
        if (response.ok) {
            setMessages([...newSetMessage, {
                message: data.reply,
                sender: 'robot',
                Key: crypto.randomUUID()
            }]);
        } else {
            console.error("Backend error:", data.error);
        }

    } catch (error) {
        console.error("Network error:", error);
    }

    }
    return (
        <div className="chat-input-container">
            <input placeholder="Enter the Text" size="30" onChange={saveInputText} value={inputText} className="chat-input" />
            <button onClick={sendMessages} className="send-button" > Send </button>
        </div>
    );
}