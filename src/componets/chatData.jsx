import { useRef, useEffect } from 'react';
import { ChatMessage } from './chatMessages';

import './chatData.css' ;

export function ChatData({ messages }) {

    const chatMessageRef = useRef(null);

    useEffect(() => {
        const containerElem = chatMessageRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat-message-container" ref={chatMessageRef}>
            {messages.map((msg) => {
                return (
                    <ChatMessage
                        message={msg.message}
                        sender={msg.sender}
                        key={msg.Key}
                    />
                );
            })}
        </div>
    );
}
