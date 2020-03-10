import React, { Component } from 'react';
import './Form.css';
import Message from '../Message/Message';
import firebase from 'firebase';
export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'Stranger',
            message: '',
            list: []
        };
        // if (this.props.category === 'random') {
        //     this.messageRef = firebase.database().ref().child('messages');
        // }
        // else if (this.props.category === 'disney') {
        //     this.messageRef = firebase.database().ref().child('disney');
        // }
        // else {
        //     this.messageRef = firebase.database().ref().child('messages');
        // }
        // console.log("Props Cat : " + this.messageRef);
        this.setMessageRef();
        this.listenMessages();
    }

    setMessageRef() {
        if (this.props.category === 'random') {
            this.messageRef = firebase.database().ref().child('messages');
        }
        else if (this.props.category === 'disney') {
            this.messageRef = firebase.database().ref().child('disney');
        }
        else if (this.props.category === 'tvseries') {
            this.messageRef = firebase.database().ref().child('tvseries');
        }
        else if (this.props.category === 'games') {
            this.messageRef = firebase.database().ref().child('games');
        }
        else {
            this.messageRef = firebase.database().ref().child('messages');
        }
        console.log("Props Cat : " + this.messageRef);
    }

    componentWillReceiveProps(nextProps) {
        console.log("Receive Props : " + nextProps.json);
        if (nextProps.user) {
            this.setState({ 'userName': nextProps.user.displayName });
        }
        this.setMessageRef();
        this.listenMessages();
    }

    componentDidMount() {
        this.setState({ 'userName': this.props.user.displayName });
        this.setMessageRef();
        this.listenMessages();
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }
    handleSend() {
        if (this.state.message) {
            console.log("state msg: " + this.state.message);
            var newItem = {
                userName: this.state.userName,
                message: this.state.message,
            }
            this.messageRef.push(newItem);
            console.log("HERE 2");
            this.setState({ message: '' });
            console.log("HERE 3");
        }
    }
    handleKeyPress(event) {
        if (event.key !== 'Enter') return;
        this.handleSend();
    }
    listenMessages() {
        console.log("Listen Msgs - Message Ref : " + this.messageRef);
        this.messageRef
            .limitToLast(10)
            .on('value', message => {
                this.setState({
                    list: Object.values(message.val()),
                });
            });
    }
    render() {
        return (
            <div className="form">
                <div className="form-msg">
                    {this.state.list.map((item, index) =>
                        <Message key={index} message={item} />
                    )}
                </div>
                <div className="form-row">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Drop a great entrance!"
                        value={this.state.message}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                    />
                    <button
                        className="form-btn"
                        onClick={this.handleSend.bind(this)}
                    >
                        SEND
          </button>
                </div>
            </div>
        );
    }
}