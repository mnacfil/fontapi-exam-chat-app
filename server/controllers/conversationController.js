const Conversation = require('../models/Conversation');
const { responseTemplate } = require('../middlewares/utilities');

const createConversation = async(req, res) => {
    const conversation = await Conversation.create( 
            { 
                userInvolve: [req.user.userID, req.body.receiverId ]
            } 
        );
    res.status(200).json(
        responseTemplate(
            'SUCCESS',
            'Succesfully create a conversion',
            conversation
        )
    );
}

// find all the user conversation with other user
const getUserConversation = async(req, res) => {
    // req.params.userId is the user id
    const userConversation = await Conversation.find({
        userInvolve: { $in: [req.user.userID]}
    })
    res.status(200).json(
        responseTemplate(
            'SUCCESS',
            'Succesfully get user conversion',
            userConversation
        )
    );
}

// find the conversation of 2 user
const getChatConversationOfTwoUser = async (req, res) => {
    const { userOneId, userTwoId } = req.params;
    const chatConversation = await Conversation.find({
        userInvolve: { $all: [userOneId, userTwoId]}
    });
    res.status(200).json(
        responseTemplate(
            'SUCCESS',
            'Succesfully get chat conversion of two user',
            chatConversation
        )
    );
}

module.exports = {
    createConversation,
    getUserConversation,
    getChatConversationOfTwoUser
}