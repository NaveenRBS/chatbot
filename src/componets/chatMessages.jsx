import robotImage from '../assets/robot.png' ;
import userImage from '../assets/user.png' ;
import './chatMessages.css' ;

export function ChatMessage(props) {
    const message = props.message;
    const sender = props.sender;
    const Key = props.Key;

    return (
        <div className={sender === 'robot' ? "robot-chat" : "user-chat"}>
            {sender === 'robot' && <img src={robotImage} width="50px" />}
            <div className="chat-message-text"> {message} </div>
            {sender === 'user' && <img src={userImage} width="50px" />}
        </div>
    );
}