import * as React from 'react';
import './style.css';
import Tree from './Components/Tree/Tree'
import Messages from './Components/Messages'
import InputBox from './Components/InputBox'
import Login from './Components/Login'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import LoginBar from "./Components/LoginBar";

interface IAppState {
    index: null|number,
    loginNeeded: boolean,
    username: string,
    statusLogin: string
}

class App extends React.Component <{}, IAppState> {

    state = {
        index: null,
        // input: "",
        loginNeeded: true,
        username: "User",
        statusLogin: "Login"
    }

    setIndexHandler = (e: any) => {
        console.log("this.state.index = entry ==>", e)
        this.setState({
            index: e
        })
    }

    reRender = () => {
        this.forceUpdate();
    }

    logOutHandler=()=>{

        if(!this.state.loginNeeded){
            this.setState({
                index: null,
                loginNeeded: !this.state.loginNeeded,
                username:"User",
                statusLogin:"Login"
            })
        }
    }
    setLoginHandler = (username:string) => {
        console.log("setLoginHandler")
        let state = this.state.loginNeeded

        this.setState({
            loginNeeded: !state,
            username:username,
            statusLogin:"Log Out"
        })

        console.log("setLoginHandler", this.state.loginNeeded)
    }

    public render() {
        const loginRenderer = () => {
            console.log("loginRenderer")
           return (this.state.loginNeeded)? <Login login={this.setLoginHandler} /> : <Redirect to=''/>

        }

        const loginBar = () => {
            return(<LoginBar getName={this.state.username} loginButton={this.state.statusLogin} logOut={this.logOutHandler}/>)
        }

            return (
                <BrowserRouter>
                    <div className="app">

                        <Route path='' name='' exact={true} strict={true} render={loginBar}/>
                        <div className="content">

                            <Tree pickedIndex={this.setIndexHandler} showTree={this.state.loginNeeded}/>
                            <section className="board">
                                <Messages idGroup={this.state.index}/>
                                <InputBox idGroup={this.state.index} renderApp={this.reRender}/>
                            </section>
                        </div>
                        {/*<footer><h2>This is my footer</h2></footer>*/}

                        <Route path='/login' name='login' exact={true} strict={true} render={loginRenderer}/>
                    </div>
                </BrowserRouter>
            );
        }
    }

    export
    default
    App;
