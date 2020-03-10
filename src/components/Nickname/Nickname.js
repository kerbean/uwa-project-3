import React, { Component } from "react";
import "./Nickname.css";
import firebase from 'firebase';
import axios from 'axios';
import dotenv from 'dotenv';
// function Nickname(props) {

//     
export default class Nickname extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            email: this.props.email,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        console.log("Receive Props : " + nextProps);
        if (nextProps.user) {
            this.setState({ 'userName': nextProps.user.displayName });
        }
    }

    componentDidMount() {
        // this.setState({ 'userName': this.props.user.displayName });
    }

    handleChange(event) {
        console.log(event.target)
        this.setState({ nickname: event.target.value });
    }
    handleSend() {
        if (this.state.nickname) {
            console.log("state msg: " + this.state.nickname);
            var body = {
                email: this.state.email,
                nickname: this.state.nickname,
            }

            // this.messageRef.push(newItem);
            // console.log("HERE 2");
            // this.setState({ message: '' });
            // console.log("HERE 3");
            axios.put(process.env.MONGODB_URI + '/api/updateUser', body)
        }
    }
    handleKeyPress(event) {
        if (event.key !== 'Enter') return;
        this.handleSend();
    }

    render() {
        return (
            < span >
                <input
                    className="nick-input"
                    type="text"
                    placeholder="Change Nickname"
                    value={this.state.nickname}
                    onChange={this.handleChange.bind(this)}
                />
                <button
                    className="app__button rounded "
                    onClick={this.handleSend.bind(this)}
                >
                    Change!
                                </button>
            </span >
        );
    }
}

// export default Nickname;