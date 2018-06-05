import IGroup from './Group'

export {Groups as default, IGroup};

interface IGroups {
    data: Array<IGroup>
}
class Groups{
    data: Array<IGroup>
    
    constructor(){
        this.data = [];    
    }

    removeGroup(id:number) {
        for (let i = 0; i <=this.data.length ; i++) {
            if(this.data[i].getId()===Number(id)){
                this.data.splice(i,1);
                return true;
            }
            return false;
        }
    };
    addGroup(group:IGroup) { /// adding to data
        this.data.push(group);
        return true;
    }

    getGroup(id:number){
        for (let i = 0; i <this.data.length ; i++) {
            if(this.data[i].getId()==id){
                return this.data[i];
            }
        }
        return null;
    };

    // print () {
    //
    //     this.data.forEach(function (entry) {
    //         entry.print();
    //     });
    // }
    
}

