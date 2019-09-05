import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import './Chat.css';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };
        const {userName} = this.props;
        this.socket = socketIOClient(`http://localhost?user=${userName}&chatRoom=chat`);
    }

    componentDidMount() {

        this.socket.on("message", message => this.setState(state => {
            const messages = [...state.messages, message];
            return {...state, messages: messages};
        }));
    }


    render() {
        const messages = this.state.messages.map((message, index) => {
            return <div key={index}>{message}</div>
        });

        return (
            <div>
                <div className="Chat">
                    {messages}
                </div>
                <textarea onKeyPress={this.sendMessage}/>
            </div>
        )
    }

    sendMessage = (event) => {
        if(event.key === 'Enter') {
            const message = event.target.value;
            event.target.value = ''; // clear text field?????

            this.setState(state => {
                const messages = [...state.messages, message];
                return {...state, messages: messages, currentValue: ''};
            });

            this.socket.emit('message', message);
        }
    }
}

export default Chat;