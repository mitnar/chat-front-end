import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import './Chat.css';
import ChatList from './ChatListView';
import UserList from './UserListView';
import Messages from './MessagesView';
import ButtonsPanel from './ButtonsPanelView';
import PropTypes from 'prop-types';
import moment from 'moment';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [], // messages in current room
            users: [] // users in current room
        };

        this.chatRoomId = +window.location.search.split('=')[1] || 1; // room after enter to chat

        this.chatRooms = [{name: "Чат 1", id: 1},
            {name: "Чат 2", id: 2},
            {name: "Чат 3", id: 3}]; // exists chat rooms

        this.socket = socketIOClient(`http://localhost`);

        this.changeUrl(this.chatRoomId);
    }

    componentDidMount() {

        this.socket.on("message", this.setMessage); // set new message to chat
        this.socket.on("userJoin", this.setUser); // user has joined to the room
        this.socket.on('userLeave', this.getRoomUsers); // update users in room after user leave room

        this.socket.on('setMessages', messages => { // new message in room
            this.setState({messages})
        });

        this.socket.on('setUsers', users => { // new user in room
            this.setState({users})
        });

        this.joinToRoom(); // join user to room by default when open page
    }

    setMessage = (message) => {

        if(this.chatRoomId === message.chatRoomId) {
            this.setState(state => {
                const messages = [...state.messages, message];
                return {...state, messages: messages};
            });
        }
    };

    setUser = (user) => {

        if(this.chatRoomId === user.chatRoomId) {
            this.setState(state => {
                const users = [...state.users, user];
                return {...state, users: users};
            })
        }
    };

    sendMessage = (event) => {
        const {userName} = this.props;
        const fieldMessage = event.target.value;

        if(event.key === 'Enter' && fieldMessage.trim() !== '') { // put enter and message not empty

            if(this.state.users.find(user => user.user === userName) === undefined) { // user not subscribe
                alert('You are not subscribe to this room. Messages are not allowed');
                return;
            }

            const message = {message: fieldMessage, user: userName,
                chatRoomId: this.chatRoomId, date: moment().format('DD.MM.YYYY HH:mm:ss')};

            event.target.value = ''; // clear text field

            this.setState(state => {
                const messages = [...state.messages, message];
                return {...state, messages: messages};
            });

            this.socket.emit('message', message);
        }
    };

    joinToRoom = () => {
        if(this.chatRoomId < 1 || this.chatRoomId > 3)
            alert('Invalid chat number');

        this.socket.emit('join', {chatRoomId: this.chatRoomId, user: this.props.userName});
        this.getRoomMessages();
        this.getRoomUsers();
    };

    leaveRoom = () => {
        this.socket.emit('leave', {chatRoomId: this.chatRoomId, user: this.props.userName});
        this.getRoomMessages();
        this.getRoomUsers();
    };

    getRoomMessages() {
        this.socket.emit('getMessages', {user: this.props.userName, chatRoomId: this.chatRoomId});
    }

    getRoomUsers = () => {
        this.socket.emit('getUsers', this.chatRoomId);
    };

    changeUrl(chatRoomId) {
        window.history.replaceState(null, '',
            `${document.location.origin + 
            document.location.pathname}?chatRoomId=${chatRoomId}`);
    };

    changeRoom = (chatRoomId) => {
        this.chatRoomId = chatRoomId;

        this.changeUrl(this.chatRoomId);
        this.getRoomMessages();
        this.getRoomUsers();
    };

    render() {
        return (
            <div className="ChatsContent">
                <ChatList
                    chatRooms={this.chatRooms}
                    changeRoom={this.changeRoom}
                    chatRoomId={this.chatRoomId}
                />
                <UserList
                    users={this.state.users}
                />
                <Messages
                    messages={this.state.messages}
                    sendMessage={this.sendMessage}
                />
                <ButtonsPanel
                    joinToRoom={this.joinToRoom}
                    leaveRoom={this.leaveRoom}
                />
            </div>
        )
    }
}

Chat.propTypes = {
    userName: PropTypes.string.isRequired,
};

export default Chat;