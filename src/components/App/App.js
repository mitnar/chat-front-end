import React, {Component} from 'react';
import './App.css';
import Chat from '../Chat/Chat';

class App extends Component {
    state = {
      userName: ''
    };

    render() {
        return (
            <div className="App">
                {this.state.userName === '' ?
                    <div>
                        <div>Введите Ваше имя</div>
                        <input type="text" onKeyPress={this.setName}/>
                    </div> :
                    <Chat userName={this.state.userName}/>
                }
            </div>
        );
    }

    setName = (event) => {
      if(event.key === 'Enter') {
          this.setState({userName: event.target.value});
      }
    }
}

export default App;
