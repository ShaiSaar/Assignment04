import * as React from 'react';
import ChatTree from './chat-tree'
import {events} from './common'
import './TreeCss.css'

interface ITreeState {
    searchInput:string
}



class Tree extends React.Component<any, ITreeState> {

    myRef: any;
    setIndex: Function;
    userLogedIn: boolean;

    constructor(props: {}) {
        super(props);

        this.userLogedIn = true;
        this.setIndex = () => {
        };
        this.myRef = React.createRef();
        this.state = {
            searchInput:""
        }
    }


    searchOnTree=(input:string)=>{
        const chatTree = ChatTree(this.myRef.current)

        let tempArr = [
            {type: "user",
            name: "Shai",
            id: 5
            },
            {type: "user",
            name: "Tahel",
            id: 5
            },
            {type: "user",
            name: "Shira",
            id: 5
            },
            {type: "user",
                name: "Ohad",
                id: 5
            },
            {type: "user",
                name: "Yarden",
                id: 5
            },
        ]
        let arrResults = [];
        for (let entry of tempArr){
            if(entry.name.includes(input)){
                arrResults.push(entry)
            }
        }
        chatTree.load(arrResults);
        events.on("changeOnActiveElement", this.chooseElement)

        // this.getTree()
        //     .then((result: any) => {
        //         let arrResults = this.getSearchResults(result,input)
        //         chatTree.load(arrResults);
        //         events.on("changeOnActiveElement", this.chooseElement)
        //         //this.myRef.current.focus();
        //     })
    }

    getSearchResults=(tree:any,input:string)=>{
        let arr: any = [];

        function search(arr:any) {
            for(let entry of arr){
                if (entry.name.includes(input)){
                    arr.push(entry)
                }
                if(entry.type==="group"){
                    search(entry.items)
                }
            }
        }
        search(tree);

        return arr;
    }
    uploadTree=(show:boolean)=>{
        const chatTree = ChatTree(this.myRef.current)
        this.getTree()
            .then((result: any) => {
                if(show){
                    chatTree.load(result);
                    events.on("changeOnActiveElement", this.chooseElement)
                }else{
                    chatTree.load([]);
                }

                //this.myRef.current.focus();
            })
    }
    componentDidMount() {
        console.log("componentDidMount")
        this.userLogedIn = this.props.showTree;
        this.setIndex = this.props.pickedIndex
        if(!this.props.showTree){
            this.uploadTree(true)
        }

    }
    componentDidUpdate(){
        // console.log("Tree: this.props.showTree",this.props.showTree)
        // console.log("Tree: this.userLogedIn",this.userLogedIn)
        if(this.userLogedIn !== this.props.showTree){
            this.userLogedIn = this.props.showTree
            if(!this.props.showTree){
                this.uploadTree(true)
            }else{
                this.uploadTree(false)
            }
        }

    }

    chooseElement = (element: any) => {
        let elm = element.getAttribute("dataId");
        elm = Number(elm);
        console.log("elm", elm, typeof elm);
        //this.setIndex.bind(null,3)
        this.props.pickedIndex(elm)
    }

    getTree() {
        return fetch('./tree.json')
            .then((result) => result.json());

    };

    setSearchInput=(event:any)=>{
        this.setState({
            searchInput: event.target.value
        })
        console.log("set input", this.state.searchInput)
        this.searchOnTree(this.state.searchInput)
    }

    public render() {
        return (

            <section className="tree">
                {/*<input type="text" onChange={this.setSearchInput} value={this.state.searchInput} placeholder="Search..."/>*/}
                {/*<p onClick={this.props.pickedIndex.bind(null, 1)} style={style}>paragraph one</p>*/}
                {/*<p onClick={this.props.pickedIndex.bind(null, 2)} style={style}>paragraph two</p>*/}
                {/*<p onClick={this.props.pickedIndex.bind(null, 3)} style={style}>paragraph three</p>*/}
                {/*<p onClick={this.props.pickedIndex.bind(null, 4)} style={style}>paragraph four</p>*/}
                {/*<p onClick={this.getIndex} style={style}>paragraph four</p>*/}
                <ul tabIndex={0} ref={this.myRef} />
            </section>

        )
    }

}

// let style = {
//     cursor: "pointer",
// };
export default Tree;