import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import styles from './chat.module.css';

const socket = io('http://localhost:4000');

const Chat = () => {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const location = useLocation();
  const savedName = location.state?.savedName || '';

  const [switchSides,setSwitchSides] = useState(false)
  const [rightSide,setRightSide] = useState(true)

  useEffect(()=>{ 

  },[switchSides,rightSide])

  useEffect(() => {
    const socket = io('http://localhost:4000');

    console.log('Component mounted');
    // Listen for chat messages from the server
    socket.on('chat message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listen for typing events from the server
    socket.on('typing', (username) => {
      if (username !== savedName) {
        setIsTyping(true);
        setTypingUser(username);
      }
    });

    // Listen for stop typing events from the server
    socket.on('stop typing', (username) => {
      if (username !== savedName) {
        setIsTyping(false);
        setTypingUser('');
      }
    });

    // Emit a message to the server to join the chat room
    socket.emit('join room', savedName);

    // Clean up the socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    // Emit the chat message to the server
    const data = {
      sender: savedName,
      message: message,
    };
    socket.emit('chat message', data);
    setMessage('');
  };

  const handleTyping = () => {
    // Emit typing event to the server
    socket.emit('typing', savedName);
    setTypingUser(savedName);
  };

  const handleStopTyping = () => {
    // Emit stop typing event to the server
    socket.emit('stop typing', savedName);
    setTypingUser('');
  };

  console.log(messages);
  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.text}>Your are logged in as {savedName}</h1>
      <div className={styles.chatDivMainContainer}>
    <div className={styles.chatDivContainer}>
      <div className={styles.mainChatBox}>

        <div className={switchSides ? styles.mainChatBoxLeftSideVisible : styles.mainChatBoxLeftSide}>
          <div className={styles.mainChatBoxLeftSideTop}>
            <input
              type="text"
              className={styles.mainChatBoxLeftSideTopInput}
              placeholder="Search by name"
              id="searchInput"
            />
          </div>

          <div className={styles.mainChatBoxLeftSideBottom}>

            <div className={styles.mainChatBoxLeftSideChatAreaStudentMain} onClick={()=>{setSwitchSides(false) ; setRightSide(true)} }>
              <div className={styles.mainChatBoxLeftSideBottomBoxImg}>
                <div className={styles.mainChatBoxLeftSideBottomBoxImgDIV}>
                  <img src="./woman.jpg" alt="" className={styles.mainChatBoxLeftSideBottomBoxImgTag} />
                </div>
              </div>
              <div className={styles.mainChatBoxLeftSideChatAreaStudent}>
              <p className={styles.mainChatBoxLeftSideBottomBoxName}>
                Emil
                </p>
                <p className={styles.mainChatBoxLeftSideChatAreaStudentBoxDate}>25.6.2023</p>
             
              </div>
            </div>

      

          </div>
        </div>


        <div className={rightSide ?  styles.mainChatBoxRightSideFlex : styles.mainChatBoxRightSideHidden}>
          <div className={styles.mainChatBoxRightSideSwitch}>
         
          <div className={styles.switchIcon} onClick={()=>{setSwitchSides(true) ; setRightSide(false)} }> {"<"}</div>
          <div className={styles.calendarIcon}>  Calendar</div>
            
          </div>
          
          <div className={styles.mainChatBoxRightSideChatArea}>
            <div className={styles.mainChatBoxRightSide}>
              {messages.map((msg, index) => (
                msg.sender === savedName ? (
                  <div className={styles.mainChatBoxRightSideChatAreaStudentMain} key={index}>
                    <div className={styles.mainChatBoxRightSideBottomBoxImg}>
                      <img src="./man.jpg" alt="" className={styles.mainChatBoxRightSideBottomBoxImgTag} />
                    </div>
                    <div className={styles.mainChatBoxRightSideChatAreaStudent}>
                      <p className={styles.mainChatBoxRightSideBottomBoxDate}>24.6.2023</p>
                      <p className={styles.mainChatBoxRightSideChatAreaStudentPtag}>
                        {msg.sender} wrote: {msg.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className={styles.mainChatBoxRightSideChatAreaTeacherMain} key={index}>
                    <div className={styles.mainChatBoxRightSideBottomBoxImg}>
                      <img src="./woman.jpg" alt="" className={styles.mainChatBoxRightSideBottomBoxImgTag} />
                    </div>
                    <div className={styles.mainChatBoxRightSideChatAreaTeacher}>
                      <p className={styles.mainChatBoxRightSideBottomBoxDate}>23.6.2023</p>
                      <p className={styles.mainChatBoxRightSideChatAreaTeacherPtag}>
                        {msg.sender} wrote: {msg.message}
                      </p>
                    </div>
                  </div>
                )
              ))}
              {isTyping && typingUser !== '' && (
                <div className={styles.typing}>
                  <h5>{typingUser} is typing...</h5>
                </div>
              )}
            </div>
          </div>
          <div className={styles.chatInputButton}>
            <textarea
              className={styles.chatInput}
              name=""
              id=""
              maxLength="500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleTyping}
              onKeyUp={handleStopTyping}
              placeholder='Write some message ....'
            ></textarea>
            <button onClick={handleSendMessage} className={styles.sendChat}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
};

export default Chat;
