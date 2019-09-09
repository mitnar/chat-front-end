import React, {Component} from 'react';
import './App.css';
import Chat from '../Chat/Chat';

class App extends Component {
    state = {
      userName: localStorage.getItem('userName') || ''
    };

    render() {
        const {userName} = this.state;

        return (
            <div className="App">
                {userName === '' ?
                    <div>
                        <div>Введите Ваше имя и нажмите Enter</div>
                        <input type="text" onKeyPress={this.setName}/>
                    </div> :
                    <div>
                        <div className="userName">Вы зашли как <b>{userName}</b></div>
                        <Chat userName={userName}/>
                    </div>
                }
            </div>
        );
    }

    setName = (event) => {
      if(event.key === 'Enter') { // enter to chat
          localStorage.setItem('userName', event.target.value);
          this.setState({userName: event.target.value});
      }
    }
}

export default App;
