import {events} from "./common";

export default ChatTree;
function ChatTree(element:any) {

    let generalItems: Array<any> = [];
    let chosenLi:any  = null;

    function load(items:Array<any>) {

        generalItems = items;
        clear();
        addLine(element);
        if(items.length>0){
        element.firstElementChild.focus();
        }
    }

    function clear() {
        element.innerHTML = "";
    }

    function getEventTarget(e:Event) {
        e = e || window.event;
        return e.target || e.srcElement;
    }


    element.onclick = function(event:any) {
        event.stopPropagation()
        let target = getEventTarget(event);
        if(target!==element && !(undefined)){
            toggleClass(target);
        }
    };

    element.ondblclick = function(event:any) {
        event.preventDefault()
        event.stopPropagation()
        let target:any = getEventTarget(event);
        if(target.data.dataType==="group" && !(undefined)) {
            toggleClass(target);
            if (target.getAttribute("status") === "close") {
                target.setAttribute("status", "open");
                addLine(target);
            } else {
                target.setAttribute("status", "close");
                removeLi(target);
            }
        }
    };

    function returnElement() {
        if(!chosenLi){
            console.log(` ${chosenLi.getAttribute("tabindex")} ${chosenLi.getAttribute("dataType")}`)
        }
        console.log("empty string")
    }


    function addLine(main:any) {
        let parent = (main === element.lastElementChild);
        let items = (main===element)? generalItems: main.data.items;
        let positionIndexElement=main;

        if(items.length>0){
            let pad = main.getAttribute("tabindex");
            for(let entry of items){
                let li:any = document.createElement("li");
                // let img = document.createElement("img");
                // img.setAttribute("src", "./pics/user3D.png");
                let img = document.createElement("i");
                img.setAttribute("class", "fas fa-user");
                img.setAttribute("style", "padding: 5px");
                li.appendChild(img);
                li.data={} ;
                li.setAttribute("tabindex",""+ (Number(pad)+1));
                li.setAttribute("dataType", entry.type);
                li.setAttribute("dataId", entry.id);
                li.data.dataType=entry.type;
                li.setAttribute("style", "padding-left:"+ Number(pad)*10+"px");
                li.appendChild(document.createTextNode(entry.name));

                if(li.data.dataType==="group"){
                    img.setAttribute("class", "fas fa-users");
                    li.classList.add("type-group");
                    li.setAttribute("status", "close");
                    li.data.items= entry.items;
                }
                if (parent || main===element){
                    element.appendChild(li);
                }else{
                    positionIndexElement.parentNode.insertBefore(li,positionIndexElement.nextSibling);
                    positionIndexElement = li;
                }
            }
        }
    }


    function removeLi(li:any) {
        let tabLI = li.getAttribute("tabindex");
        let nextSibling = li.nextSibling;
        let nextSiblingTabLI = nextSibling.getAttribute("tabindex");

        while(Number(nextSiblingTabLI)>Number(tabLI)){
            element.removeChild(nextSibling);
            nextSibling = li.nextSibling;
            if(nextSibling===null) return;
            nextSiblingTabLI = nextSibling.getAttribute("tabindex");

        }
    }

    const toggleClass = (element:any)=>{
        if(chosenLi===element){
            // element.classList.remove("activeLine");
            // chosenLi=null;
            return;
        }
        if(chosenLi!==null){
            chosenLi.classList.remove("activeLine");
        }
        element.classList.add("activeLine");
        chosenLi = element;
        events.emit("changeOnActiveElement", [chosenLi]);
        chosenLi.focus();
    };

    // Handling Keyboard Press
    element.onkeydown = checkKey;

    function checkKey(e:any) {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                upArrow();
                break;
            case 40:
                downArrow();
                break;
            case 37:
                leftArrow();
                break;
            case 39:
                rightArrow();
                break;
            case 13:
                enterKey();
                break;
        }

    }

    function downArrow (){
        // down arrow
        if(chosenLi===null){
            toggleClass(element.firstElementChild);
        }else{
            if(chosenLi === element.lastElementChild){
                return false;
            }
            toggleClass(chosenLi.nextSibling)
        }
        return;
    }

    function upArrow (){
        // up arrow
        if(chosenLi===null){
            toggleClass(element.lastElementChild);
        }else{
            if(chosenLi === element.firstElementChild){
                return false;
            }
            toggleClass(chosenLi.previousSibling)
        }
        return;
    }

    function leftArrow (){
        // left arrow
        let type = chosenLi.getAttribute("dataType");
        let status = (type==="group")? chosenLi.getAttribute("status"): "";
        if(type==="group" && status==="open"){
            chosenLi.setAttribute("status", "close");
            removeLi(chosenLi);
        }
        if (type === "user" || type==="group" && status==="close"){
            let tabindex = Number(chosenLi.getAttribute("tabindex"));
            if (tabindex===1){
                toggleClass(element.firstElementChild);
                return;
            }else{
                let preSibling = chosenLi.previousSibling;
                let preSiblingtabindex = Number(preSibling.getAttribute("tabindex"));

                while(tabindex <= preSiblingtabindex){
                    preSibling = preSibling.previousSibling;
                    preSiblingtabindex = preSibling.getAttribute("tabindex");
                }
                toggleClass(preSibling);
            }
        }
        return;
    }

    function rightArrow (){
        // right arrow
        let type = chosenLi.getAttribute("dataType");
        let status = chosenLi.getAttribute("status");
        if(type==="group" && status==="close"){
            chosenLi.setAttribute("status", "open");
            addLine(chosenLi);
        }
    }

    function enterKey() {
        let type = chosenLi.getAttribute("dataType");
        if(type==="group"){
            let status = chosenLi.getAttribute("status");
            if (status==="open"){
                leftArrow()
            }else{
                rightArrow()
            }
        }
    }


    return {
        load,
        clear,
        element,
        chosenLi,
        returnElement,
    };
}
