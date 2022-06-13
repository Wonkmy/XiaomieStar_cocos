// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
    public TASKCONFIG=[
        {
            "id":0,
            "getMoneyValue":"0.2元",
            "crossLevelNum":0,
            "totalProcessValue":10,
            "isGet":false
        },
        {
            "id":1,
            "getMoneyValue":"0.3元",
            "crossLevelNum":0,
            "totalProcessValue":20,
            "isGet":false
        },
        {
            "id":2,
            "getMoneyValue":"0.5元",
            "crossLevelNum":0,
            "totalProcessValue":30,
            "isGet":false
        }
]
}
