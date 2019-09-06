import React from "react";
import PropTypes from 'prop-types';

function ChatListView({
 chatRooms,
 changeRoom,
 chatRoomId
}) {

    const chatList = chatRooms.map(chatRoom => {
        return <div key={chatRoom.id} onClick={() => changeRoom(chatRoom.id)}>
            {chatRoomId === chatRoom.id &&
                <span>&bull;</span>
            }
            {chatRoom.name}
        </div>
    });

    return (
        <div className="ChatList">
            {chatList}
        </div>
    )
}

ChatListView.propTypes = {
    chatRooms: PropTypes.arrayOf(PropTypes.object).isRequired,
    changeRoom: PropTypes.func.isRequired,
    chatRoomId: PropTypes.number.isRequired
};

export default ChatListView;