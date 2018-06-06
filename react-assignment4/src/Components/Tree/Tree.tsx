import * as React from 'react';
import ChatTree from './chat-tree'
import {events} from './common'
import './TreeCss.css'

interface ITreeState {
    searchInput: string
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
            searchInput: ""
        }
    }


    searchOnTree = () => {
        let input = this.state.searchInput
        const chatTree = ChatTree(this.myRef.current)

        this.getTree()
            .then((result: any) => {
                if (input.length !== 0) {
                    let arrResults = this.getSearchResults(result, input)
                    // arrResults = [...new Set(arrResults)]
                    chatTree.load(arrResults);
                } else {
                    chatTree.load(result);
                }

                events.on("changeOnActiveElement", this.chooseElement)
                //this.myRef.current.focus();
            })
    }

    getSearchResults = (tree: any, input: string) => {
        let arrResults: any = [];
        //let objResults: any = {};

        function search(arr: any) {
            for (let entry of arr) {
                if (entry.name.toUpperCase().includes(input.toUpperCase())) {
                    //objResults[entry.name]=entry
                    arrResults.push(entry)
                }
                if (entry.type === "group") {
                    search(entry.items)
                }
            }
        }

        search(tree);
        // for(let entry in objResults){
        //     arrResults.push(entry)
        // }
        let tmp = Array.from(arrResults, obj => JSON.stringify(obj));
        let filtered = Array.from(Array.from(new Set(tmp)), obj => JSON.parse(obj));

        return filtered;
    }
    uploadTree = (show: boolean) => {
        const chatTree = ChatTree(this.myRef.current)
        this.getTree()
            .then((result: any) => {
                if (show) {
                    chatTree.load(result);
                    events.on("changeOnActiveElement", this.chooseElement)
                } else {
                    chatTree.load([]);
                }

                //this.myRef.current.focus();
            })
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.userLogedIn = this.props.showTree;
        this.setIndex = this.props.pickedIndex
        if (!this.props.showTree) {
            this.uploadTree(true)
        }

    }

    componentDidUpdate() {
        // console.log("Tree: this.props.showTree",this.props.showTree)
        // console.log("Tree: this.userLogedIn",this.userLogedIn)
        if (this.userLogedIn !== this.props.showTree) {
            this.userLogedIn = this.props.showTree
            if (!this.props.showTree) {
                this.uploadTree(true)
            } else {
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

    setSearchInput = (event: any) => {
        this.setState({
            searchInput: event.target.value
        })
        console.log("set input", this.state.searchInput)
        // this.searchOnTree(this.state.searchInput)
    }

    public render() {
        const searchBar = () => {
            return (
                <div className="Tree-searchBar">
                    <input className="Tree-searchBar-input" type="text" onChange={this.setSearchInput} value={this.state.searchInput} placeholder="Search..."/>
                    <i onClick={this.searchOnTree} className="fas fa-search Tree-searchBar-button"/>
                    {/*onClick={this.searchOnTree(this.state.searchInput)}*/}
                </div>)
        }
        return (

            <section className="tree">
                {(!this.props.showTree) ? searchBar() : null}

                {/*<input type="text" onChange={this.setSearchInput} value={this.state.searchInput} placeholder="Search..."/>*/}
                {/*<p onClick={this.props.pickedIndex.bind(null, 1)} style={style}>paragraph one</p>*/}
                {/*<p onClick={this.props.pickedIndex.bind(null, 2)} style={style}>paragraph two</p>*/}
                {/*<p onClick={this.props.pickedIndex.bind(null, 3)} style={style}>paragraph three</p>*/}
                {/*<p onClick={this.props.pickedIndex.bind(null, 4)} style={style}>paragraph four</p>*/}
                {/*<p onClick={this.getIndex} style={style}>paragraph four</p>*/}
                <ul tabIndex={0} ref={this.myRef}/>
            </section>

        )
    }

}

// let style = {
//     cursor: "pointer",
// };
export default Tree;