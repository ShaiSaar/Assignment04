import * as React from 'react'
import {Link} from 'react-router-dom'
import AuthenticationStore from "../DataStore/AuthenticationStore";

interface ILoginState {
    username:string,
    password:string,
    showMsg: boolean,
    msg:string
}

class Login extends React.Component <any,ILoginState>{

    constructor(props:{}){
        super(props)

        this.state={
            username:"",
            password:"",
            showMsg: false,
            msg:""
        }
    }
    addUserHandler=()=>{
        if(this.state.username.length>2 && this.state.password.length>2){
            if(!AuthenticationStore.getInstance().get(this.state.username)){
                AuthenticationStore.getInstance().set(this.state.username,this.state.password)
                this.setStateHandler(true,"You successfully signed up")
            }else{
                this.setStateHandler(true,"User name exist, please pick another one")
            }

        }else{
            this.setStateHandler(true,"User/Password should be more than 3 characters")
        }

    }
    clickHandler=()=>{
       //console.log("this is the click handler")

       if(AuthenticationStore.getInstance().get(this.state.username)){
           let password = AuthenticationStore.getInstance().get(this.state.username)
           if(password=== this.state.password){
               this.setStateHandler(false,"User found and authenticated")
               this.props.login(this.state.username)
           } else{
               this.setStateHandler(true,"User's password is not correct")
           }
       }else{
           this.setStateHandler(true,"Not such user exist")
       }
        // this.props.login()
    }

    setStateHandler=(msgState:boolean,msg:string)=>{
        this.setState({
            showMsg: msgState,
            msg:msg||""
        })
    }

    setUsername=(event:any)=>{
        this.setState({
            username: event.target.value
        })
    }

    setPassword=(event:any)=>{
        this.setState({
            password: event.target.value
        })
    }
    render(){
        return(
                <div className="wrapper">
                    <div className="login">
                        <h2>Welcome</h2>
                        <h3>Sign in or Sign up</h3>
                        <div className="login-input-container">
                            <input type="text" name="username" placeholder="Enter your username" onChange={this.setUsername} value={this.state.username}/>
                            <input type="password" name="password" placeholder="Enter your password" onChange={this.setPassword} value={this.state.password}/>
                        </div>

                        {this.state.showMsg? <h6 className="login-alertMsg">{this.state.msg}</h6>: null}
                        {/*<button value="login" onClick={this.clickHandler}>login</button>*/}
                        <div className="login-button-container">
                            <Link className="login-button" to=''>Cancel</Link>
                            <div className="login-button" onClick={this.addUserHandler}>Sign up</div>
                            <Link className="login-button" to='/login' onClick={this.clickHandler}>Sign in</Link>
                        </div>

                    </div>
                </div>
        )
    }
}

export default Login