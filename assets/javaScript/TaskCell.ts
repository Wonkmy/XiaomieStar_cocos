// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataDefine from "./DataDefine";
import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskCell extends cc.Component {

    @property(cc.Label)
    money_num: cc.Label = null;

    @property(cc.Label)
    processLabel: cc.Label = null;

    @property(cc.Sprite)
    taskProcessSlider_img: cc.Sprite = null;

    @property(cc.Node)
    btn_Get: cc.Node = null;

    @property(cc.Node)
    btn_NotGet: cc.Node = null;

    crossLevelNum = 0;
    totalLevelNum = 0;
    isGet=false
    id = -1;

    // "getMoneyValue":"0.5",
    // "crossLevelNum":0,
    // "processValue" :0,
    // "totalProcessValue":10,
    // "isGet":false

    onLoad(){
        this.btn_Get.on(cc.Node.EventType.TOUCH_START,this.finishAndRemoveTask,this)

        let crossLevel = cc.sys.localStorage.getItem("curCrossedLevel");
        if(crossLevel!=null){
            DataDefine.curCrossedLevelNumber=parseInt(JSON.parse(crossLevel));
        }else{
            DataDefine.curCrossedLevelNumber=0;
        }
    }

    finishAndRemoveTask(){
        this.node.destroy();
    }

    init(taskInfo){
        this.id=taskInfo.id;
        this.isGet=taskInfo.isGet;
        this.money_num.string=taskInfo.getMoneyValue;
        this.crossLevelNum=taskInfo.crossLevelNum;
        this.totalLevelNum=taskInfo.totalProcessValue;
        
        this.taskProcessSlider_img.fillRange=DataDefine.curCrossedLevelNumber/this.totalLevelNum;//2/10 = 0.2
        this.processLabel.string =String(DataDefine.curCrossedLevelNumber+"/"+this.totalLevelNum);
        if(this.isGet==false){
            this.btn_NotGet.active=true;
            this.btn_Get.active=false;
        }else{
            this.btn_NotGet.active=false;
            this.btn_Get.active=true;
        }
    }

    upgradeTaskProcess(){
        this.taskProcessSlider_img.fillRange+=1/this.totalLevelNum;
        if(this.taskProcessSlider_img.fillRange>=1){
            this.isGet=true;
            this.btn_NotGet.active=false;
            this.btn_Get.active=true;
        }
        this.processLabel.string =String(DataDefine.curCrossedLevelNumber+"/"+this.totalLevelNum);
    }

    refreshTaskInfo(){
        if(this.taskProcessSlider_img.fillRange>=1){
            this.btn_NotGet.active=false;
            this.btn_Get.active=true;
        }
        this.processLabel.string =String(DataDefine.curCrossedLevelNumber+"/"+this.totalLevelNum);
    }
}
