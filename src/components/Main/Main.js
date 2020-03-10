import React, { Component } from 'react';
//import logo from '../../images/logo.svg';
import './Main.css';
import Form from '../Form/Form.js';
import App from '../App/App.js';
import Nickname from "../Nickname/Nickname";
import Footer from "../Footer";
import firebase from 'firebase';
import firebaseConfig from '../../config';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            category: null,
            exists: null,
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user: user });
            // this.props.history.push('/path');
        });
    }

    handleSignIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    // renderRedirect = () => {
    //     return <Redirect to="/App" />
    // }

    handleLogOut() {
        firebase.auth().signOut();
    }

    chooseCategory1() {
        this.setState({ category: "random" });
    }

    chooseCategory2() {
        this.setState({ category: "disney" });
    }

    chooseCategory3() {
        this.setState({ category: "tvseries" });
    }

    chooseCategory4() {
        this.setState({ category: "games" });
    }

    doesUserExist() {
        axios.get(process.env.MONGODB_URI + '/api/email/' + this.state.user.email)
            .then(res => {
                const persons = res.data;
                console.log("success" + persons);
                this.setState({ exists: persons });
            });

        if (!this.state.exists.Nickname) {
            let body = {
                email: this.state.email,
                Nickname: this.state.user.displayName
            }
            axios.post(process.env.MONGODB_URI + '/api/create', body)
        }
    }

    render() {
        return (
            <div className="app">
                <div className="app__header">
                    {/* <img src={logo} className="app__logo" alt="logo" /> */}
                    {this.state.user ? (
                        // <button>
                        //     Change Nickname
                        // </button>
                        // { this.doesUserExist.bind(this) }
                        < h1 onChange={this.doesUserExist.bind(this)}>
                            {
                                this.state.exists ? (
                                    <div>Welcome, <span>{this.state.exists.Nickname}</span></div>
                                ) : (<div>Welcome, <span>{this.state.user.displayName}</span></div>)
                            }

                        </h1>

                    ) : (
                            <h1>
                                CHAT SHROOMS
                            </h1>
                        )}


                    {this.state.user ? (
                        // <button>
                        //     Change Nickname
                        // </button>
                        <div>
                            <Nickname email={this.state.email} />

                        </div>

                    ) : (
                            <div></div>
                        )}

                </div>
                {
                    this.state.user ? (
                        <div className="app__list">
                            {console.log("User to Form: " + this.state.user.displayName)}
                            {console.log("Email to Form: " + this.state.user.email)}
                            {console.log("Category: " + this.state.category)}
                        </div>
                    ) : (
                            <span className="login-first">Please login first before proceeding with the chat</span>
                        )
                }
                {
                    this.state.user ? (
                        <div className="app__list">
                            {console.log("User to Form: " + this.state.user.displayName)}
                            {console.log("Email to Form: " + this.state.user.email)}
                            {console.log("Category: " + this.state.category)}
                            <span className="login-first">Please choose a category to proceed</span>
                            <div>
                                <button
                                    className="app__button rounded "
                                    onClick={this.chooseCategory1.bind(this)}
                                >
                                    RANDOM
                                </button>
                                <button
                                    className="app__button rounded "
                                    onClick={this.chooseCategory2.bind(this)}
                                >
                                    DISNEY
                                </button>
                                <button
                                    className="app__button rounded "
                                    onClick={this.chooseCategory3.bind(this)}
                                >
                                    TV SERIES
                                </button>
                                <button
                                    className="app__button rounded "
                                    onClick={this.chooseCategory4.bind(this)}
                                >
                                    GAMES
                                </button>
                            </div>
                        </div>
                    ) : (
                            <div></div>
                        )
                }
                {
                    this.state.category && this.state.user ? (
                        <div className="app__list">
                            {console.log("User to Form: " + this.state.user.displayName)}
                            {console.log("Email to Form: " + this.state.user.email)}
                            {console.log("Category: " + this.state.category)}
                            <Form user={this.state.user} category={this.state.category} />
                        </div>
                    ) : (
                            <div></div>
                        )
                }
                {
                    !this.state.user ? (
                        <div><button
                            className="app__button rounded "
                            onClick={this.handleSignIn.bind(this)}
                        >
                            Sign in
                            </button></div>
                    ) : (
                            // this.context.router.push("./App/App")

                            // <Router>
                            //     <Route exact path="/">
                            //         {console.log("We were here")}
                            //         {this.state.user ? <Redirect to="/App" /> : <Main />}
                            // </Route>
                            <div><button
                                className="app__button rounded "
                                onClick={this.handleLogOut.bind(this)}
                            >
                                Logout
                                </button></div>
                            // {/* </Router> */}
                            // <button
                            //     className="app__button rounded "
                            //     onClick={this.handleLogOut.bind(this)}
                            // >
                            //     Logout
                            //     </button>
                        )
                }
                <Footer />
            </div >
        );
    }
}
export default Main;