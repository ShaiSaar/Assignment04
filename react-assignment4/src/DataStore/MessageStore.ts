interface IMessageStore {

    get(key:string):any|null
    set(key:string,value:any):void
}



class MessageStore implements IMessageStore{

    state :any;
    constructor(){
    this.state = {
        1:[{
            classType: "me",
            senderName: "Shai",
            senderContent: "Shai sent a message",
            senderDate: "sent at 13:59 25/2/18"},
            {
            classType: "me",
            senderName: "Shai",
            senderContent: "Shai sent a message",
            senderDate: "sent at 13:59 25/2/18"
            },
            {
            classType: "me",
            senderName: "Shai",
            senderContent: "Shai sent a message",
            senderDate: "sent at 13:59 25/2/18"
            }],
        2:[{
            classType: "notMe",
            senderName: "Ohad",
            senderContent: "Ohad sent a message",
            senderDate: "sent at 13:59 25/2/18"
        },{
            classType: "notMe",
            senderName: "Ohad",
            senderContent: "Ohad sent a message",
            senderDate: "sent at 13:59 25/2/18"
        },{
            classType: "notMe",
            senderName: "Ohad",
            senderContent: "Ohad sent a message",
            senderDate: "sent at 13:59 25/2/18"
        }],
        3:[{
            classType: "me",
            senderName: "Ariel",
            senderContent: "Ariel sent a message",
            senderDate: "sent at 13:59 25/2/18"
        },{
            classType: "me",
            senderName: "Ariel",
            senderContent: "Ariel sent a message",
            senderDate: "sent at 13:59 25/2/18"
        },{
            classType: "me",
            senderName: "Ariel",
            senderContent: "Ariel sent a message",
            senderDate: "sent at 13:59 25/2/18"
        }]

        }
    }

    get(key:string){
        console.log(this.state);
        if(!this.state[key]){
            this.state[key]=[]
        }
        // return this.state[key]||[]
        return this.state[key]
    }
    set(key:string,value:string){
        let today = new Date()
        let msg = {
            classType: "me",
            senderName: "Ariel",
            senderContent: value,
            senderDate: "sent at "+ today.toLocaleTimeString()+" "+today.toLocaleDateString()
        }
        console.log("msg.classType 1", msg.classType)

        this.state[key].push(msg)
        let msg2 = Object.assign({},msg)
        msg2.classType = "notMe"
        msg2.senderContent+=msg.classType
        this.state[key].push(msg2)
        console.log("msg.classType 2", msg2.classType)
        return true;
    }
    static instance: MessageStore;

    static getInstance() {
        if (!MessageStore.instance) {
            MessageStore.instance = new MessageStore();
        }

        return MessageStore.instance;
    }


}

export default MessageStore