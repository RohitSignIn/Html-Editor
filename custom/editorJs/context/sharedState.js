// let ts = {
//     styleTargetElem: null,
//     borderRadiusPx: "10px"
// }

// export function getSharedState() {
//     return ts
// }

// export function setSharedState(updState) {
//     ts = {...ts, ...updState}
// }

class State {
    static data = {
        styleTargetElem: [],
        borderRadiusPx: "10px"
    }
    
    static getState(key) {
        return State.data[key];
    }

    static setState(key, data) {
        // if(isNodeList(data)){
        if(data.length){
            State.data[key] = [...data]
        }else{
            State.data[key] = [data]
        }
        // }
        // State.data[key] = [data]
    }
}

export default State;