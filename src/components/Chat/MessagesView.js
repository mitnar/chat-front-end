import React from "react";
import PropTypes from "prop-types";

function MessagesView({
    messages,
    sendMessage
}) {

    messages = messages.map((message, index) => {
        return <div key={index}>{message.message}
            <span className="Info"> ({message.user}, {message.date})</span>
        </div>
    });

    return (
        <div>
            <div className="Chat">
                {messages}
            </div>
            <textarea onKeyPress={sendMessage} placeholder="Введите сообщение и нажмите enter"/>
        </div>
    )
}

MessagesView.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default MessagesView;