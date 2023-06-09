import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { serverBaseUrl } from '../util/axios'
import {conversationOfTwoPath, conversationPath} from '../util/constant';

const Chat = ({ 
  firstName, 
  lastName, 
  _id, 
  setCurrentChat, 
  userID, 
  isOnline, 
  receiveMessage,
  currentChat,
  messages
}) => {
  const initial = [...firstName][0].toUpperCase();
  const [lastMessage, setLastMessage] = useState(null);
  // get the last message sent by chatmate;
  useEffect(() => {
    setLastMessage (messages.filter(messageOjct => messageOjct.sender !== userID).slice(-1)[0]);
  }, [messages]);
  // get the conversation between this user and current user
  const handleClick = async () => {
    try {
      const response = await serverBaseUrl.get(`${conversationOfTwoPath}/${_id}/${userID}`)
      // if there no conversation then create conversation
      if(response.data.data.length === 0) {
        const reqBody = { receiverId: _id};
        const response = await serverBaseUrl.post(conversationPath, reqBody);
        setCurrentChat(response.data.data);
        return;
      }
      setCurrentChat(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Wrapper>
      <div className="chat-container" onClick={handleClick}>
        <div>
          <div className="left">
            {initial}
            <div className={`${isOnline && 'show-online-user'} online-status`}></div>
          </div>
          <div className="right">
            <h5 className='name'>{firstName} {lastName}</h5>
            <p>
              <span className='firstName'>{firstName}:</span>
              <span 
                className='message'
                >
                  { lastMessage?.sender === _id && lastMessage?.message}
              </span>
              {/* <span className='time-ago'>{createdAt}</span> */}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  background-color: var(--grey-50);
  box-shadow: var(--shadow-2);
  transition: var(--transition);
  margin: 5px 0;
  border-radius: var(--borderRadius);
  padding: 5px;
  cursor: pointer;

  .chat-container {

    div {
      display: flex;
      align-items: center;
      height: 3.5rem;

      .left {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        background-color: var(--primary-300);
        display: grid;
        place-items: center;
        margin-right: 10px;
        position: relative;

        .online-status {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #4BB543;
          bottom: 6px;
          right: 2px;
          display: none;
        }
        .show-online-user {
          display: block;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        h5 {
          margin: 0;
        }
        p {
          color: var(--grey-400);
          font-size: 14px;
          margin: 0;
          letter-spacing: var(--letterSpacing);
          .firstName {
            margin-right: 5px;
          }
          .message {
            margin-right: 1rem;
          }
        }
      }
    }
  }

  &:hover {
    box-shadow: var(--shadow-4);
    background-color: var(--grey-200);
  }
`;

export default Chat