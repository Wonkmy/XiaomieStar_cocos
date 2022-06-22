// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {


    @property(cc.Node)
    danmuNode: cc.Node = null;
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
        },
        {
            "id":3,
            "getMoneyValue":"0.2元",
            "crossLevelNum":0,
            "totalProcessValue":10,
            "isGet":false
        },
        {
            "id":4,
            "getMoneyValue":"0.3元",
            "crossLevelNum":0,
            "totalProcessValue":20,
            "isGet":false
        },
        {
            "id":5,
            "getMoneyValue":"0.5元",
            "crossLevelNum":0,
            "totalProcessValue":30,
            "isGet":false
        },{
            "id":6,
            "getMoneyValue":"0.2元",
            "crossLevelNum":0,
            "totalProcessValue":10,
            "isGet":false
        },
        {
            "id":7,
            "getMoneyValue":"0.3元",
            "crossLevelNum":0,
            "totalProcessValue":20,
            "isGet":false
        },
        {
            "id":8,
            "getMoneyValue":"0.5元",
            "crossLevelNum":0,
            "totalProcessValue":30,
            "isGet":false
        },
        {
            "id":9,
            "getMoneyValue":"0.5元",
            "crossLevelNum":0,
            "totalProcessValue":30,
            "isGet":false
        }
    ]

    protected onLoad(): void {
        
        this.danmuNode.on(cc.Node.EventType.TOUCH_START,()=>{
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Test", "hello", "(Ljava/lang/String;)V", "this is a message from js");
        },this)
    }
}
