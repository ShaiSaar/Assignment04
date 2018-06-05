export {Group as default, IGroup};

interface IGroup {
    numOfUserBelow: number;
    _id: number;
    _name : string;
    _parent :number;
    _children : Array<any>;
}


class Group implements IGroup{

    numOfUserBelow: number;
    _id: number;
    _name : string;
    _parent :number;
    _children : Array<User| Group>;

    //TODO import User
    constructor (id:number, name:String, parent:number){
        this.numOfUserBelow = 0;
        this._id = id;
        this._name = name;
        this._parent = parent || 0;
        this._children = [];

    }

    getNumOfUsers(): number {
        return this.numOfUserBelow;
    };

    setNumOfUsers (num:number) :boolean{
        this.numOfUserBelow += num ;
        return true;
    };

    getName ():string {
        return this._name;
    };

    getParent ():number {
        return this._parent;
    };

    getId ():number {
        return this._id;
    };

    setParent: boolean (id:number) {
        this._parent = id;
        return true;
    };

    getChildren (){    //return array
        return this._children;
    };

    addUser (user:object){
        this._children.push(user);
        return true;
    };

    removeGroupByIndex(index:number){
        this._children.splice(index,1);
    };

    getNumOfChildren(){
        let len = this._children.length;
        return len;
    };

    getFirstChild(){
        let grp = this._children[0];
        return grp;
    };


    removeUser (user:object) {
        for(let i = 0; i < this._children.length; i++) {
            if (this._children[i] === user) {
                this._children.splice(i, 1);
                return true;
            }
            return false;
        }
        return false;
    };
    print () {
        var gr= `name: ${this.getName()} `;
        gr+= `| id: ${this.getId()} `;
        gr+= `| parent: ${this.getParent()} `;
        gr+= "| children: " ;
        let numOfChildren = this._children.length;
        let type = "";
        if(this._children.length>0){
            if(this._children[0] instanceof Group){
                type = " Groups";
                gr += " " + numOfChildren + type;
            } else {
                type = " Users";
                gr += " " + numOfChildren + type;
            }
        }else {
            gr += numOfChildren + " children";
        }

        console.log(gr);
    }

}

