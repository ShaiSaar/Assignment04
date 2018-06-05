import * as React from 'react'
import MessageStore from "../DataStore/MessageStore";

interface IInputBox {
    groupId: any;
    input: string
}
class InputBox extends React.Component <any,IInputBox>{

    constructor(props:any){
        super(props)
        this.state={
            groupId: null,
            input:""
        }
    }

    componentDidMount(){
        this.setState({
            groupId:this.props.idGroup
        })
    }
    componentDidUpdate(){
        if(this.props.idGroup!==this.state.groupId){
            this.setState({
                groupId:this.props.idGroup
            })
        }
    }
    clickHandler=()=>{
        MessageStore.getInstance().set(this.state.groupId.toString(),this.state.input)
        this.clearInput()
        this.props.renderApp()


    }

    clearInput = ()=>{
        this.setState({
            input:""
        })
    }
    setInput=(event:any)=>{
        this.setState({
            input: event.target.value
        })
    }
    keyHandler= (e: any)=>{
            if(e.key == 'Enter'){
                this.clickHandler.bind(this);
                console.log('enter press here! ')
            }

    }

    render(){
        return(
            <div className="input-box">
                <input type="text" onChange={this.setInput} placeholder="enter your message here" value={this.state.input} onKeyPress={this.keyHandler}/>
                <button onClick={this.clickHandler}>send</button>
            </div>
        )
    }
}
export default InputBox;