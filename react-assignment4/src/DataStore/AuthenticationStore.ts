interface IAuthenticationStore {

    get(key:string):any|null
    set(key:string,value:any):void
}

class AuthenticationStore implements IAuthenticationStore{

    state :any;
    constructor(){
        this.state = {
            shai: "123",
            ariel: "123",
            ohad: "123"
        }
    }

    get(key:string){
        if(!this.state[key]){
            return null
        }
        return this.state[key]
    }
    set(key:string,value:string){
        this.state[key] = value
        return true;
    }
    static instance: AuthenticationStore;

    static getInstance() {
        if (!AuthenticationStore.instance) {
            AuthenticationStore.instance = new AuthenticationStore();
        }

        return AuthenticationStore.instance;
    }


}

export default AuthenticationStore