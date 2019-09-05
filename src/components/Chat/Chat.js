import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import './Chat.css';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
        };
        this.chatRoomId = 1; // default room after enter to chat
        this.chatRooms = [{name: "Чат 1", id: 1}, {name: "Чат 2", id: 2}, {name: "Чат 3", id: 3}];
        this.socket = socketIOClient(`http://localhost`);
    }

    componentDidMount() {

        this.socket.on("message", message => this.setState(state => {
            const messages = [...state.messages, message];
            return {...state, messages: messages};
        }));

        this.socket.emit('join', {chatRoomId: this.chatRoomId, user: this.props.userName});
        this.getRoomMessages();
    }

    render() {
        const messages = this.state.messages.map((message, index) => {
            return <div key={index}>{message.message} - {message.user}</div>
        });
        const chatList = this.chatRooms.map(chatRoom => {
            return <div key={chatRoom.id} onClick={() => this.changeRoom(chatRoom.id)}>{chatRoom.name}</div>
        });
        return (
            <div className="ChatsContent">
                <div className="ChatList">
                    {chatList}
                </div>
                <div>
                    <div className="Chat">
                        {messages}
                    </div>
                    <textarea onKeyPress={this.sendMessage}/>
                </div>
            </div>
        )
    }

    sendMessage = (event) => {
        const {userName} = this.props;

        if(event.key === 'Enter') {
            const message = {message: event.target.value, user: userName, chatRoomId: this.chatRoomId};
            event.target.value = ''; // clear text field?????

            this.setState(state => {
                const messages = [...state.messages, message];
                return {...state, messages: messages};
            });

            this.socket.emit('message', message);
        }
    };

    getRoomMessages() {
        this.socket.emit('getMessages', this.chatRoomId);
        this.socket.on('getMessages', messages => this.setState(state => {
            return {...state, messages: messages};
        }))
    }

    changeRoom = (chatRoomId) => {
        this.chatRoomId = chatRoomId;
        this.getRoomMessages();
    }
}

export default Chat;