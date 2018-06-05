interface ITreeStore {
    state: {}
    get(key:string): any | null;
    set(key:string, value:any):void
}

class TreeStore implements ITreeStore{

    state: object = {}

    static instance: ITreeStore

    static getInstance = ()=>{
        if(TreeStore.instance===null)
            TreeStore.instance = new TreeStore()

        return TreeStore.instance
    }

    get (key:string){
        return this.state[key] || null;
    }

    set(key:string, value:any){
        this.state[key] = value
        return true;
    }
}

export default TreeStore