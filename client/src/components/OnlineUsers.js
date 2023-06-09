import React from 'react'
import { useAppContext } from '../context/App/context';
import { useAccountContext } from '../context/Account/context';
import Chat from './Chat';

const OnlineUsers = () => {
    const { dbUsers, onlineUsers, setCurrentChat, receiveMessage, messages } = useAppContext();
    const { user } = useAccountContext();
    const users = dbUsers.filter(dbUser => {
        for(const onlineUser of onlineUsers ) {
            if(onlineUser.userID === dbUser._id) return dbUser;
        }
    });

    return (
        <div>
            {users.map((socketUser, index) => {
                return (
                  <Chat 
                    key={index} 
                    {...socketUser} 
                    setCurrentChat={setCurrentChat}
                    userID = {user.userID}
                    receiveMessage={receiveMessage}
                    messages={messages}
                    />
                  )
            })}
        </div>
    )
}

export default OnlineUsers