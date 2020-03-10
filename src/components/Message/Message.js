import React, { Component } from 'react';
import './Message.css';

class Message extends Component {
    render() {
        return (
            <div className="msg">
                <span className="author">
                    {this.props.message.userName}:
                </span>
                {this.props.message.message}
            </div>
        )
    }
}


export default Message;