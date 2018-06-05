import * as React from 'react';
import Message from './Message';
import MessageStore from "../DataStore/MessageStore";

interface IMessages {
    messageStore: any,
    idGroup : number
}
class Messages extends React.Component <any,IMessages> {

    myRef:any;
    constructor(props:{}){
        super(props);
        this.state ={
            messageStore: [],
            idGroup : 0,

        }
        this.myRef = React.createRef()
    }

    getMessages(arr:any){
        return MessageStore.getInstance().get(arr)
    }
    componentDidMount(){
        if(this.props.idGroup===this.state.idGroup){
            return;
        }else{
            this.setState({
                idGroup : this.props.idGroup,
                messageStore: this.getMessages(this.props.idGroup)
            })
            this.forceUpdate()
        }
        return
    }
    componentDidUpdate(){
        const objDiv = document.querySelector("ul.messages");
        if(this.props.idGroup===this.state.idGroup){

            if(!!objDiv){objDiv.scrollTop = objDiv.scrollHeight;}
            return;
        }else{
            this.setState({
                idGroup : this.props.idGroup,
                messageStore: this.getMessages(this.props.idGroup)
            })
            console.log("this.state",this.state)
            if(!!objDiv){objDiv.scrollTop = objDiv.scrollHeight;}
            this.forceUpdate()
        }
        return
    }


    render(){
        return(
            <ul className="messages" ref={this.myRef}>

                {this.state.messageStore.map((msg:any,i:any) => <Message key={i} classType={msg.classType} senderName={msg.senderName} senderContent={msg.senderContent} senderDate={msg.senderDate}/>)}

            </ul>
        )
    }

}

export default Messages;