import * as React from 'react';

// interface IMessage <>{
//     senderName: string
//     senderContent: string
//     senderDate: string
//     classType:string
// }
const Message = (props:any) => {
    return(
        <li className={`message me clear ${props.classType}`}>
            <span className="sender-name">{props.senderName}</span>
            <span className="sender-content">{props.senderContent}</span>
            <span className="sender-date">{props.senderDate}</span>
        </li>
    )
}

export default Message;