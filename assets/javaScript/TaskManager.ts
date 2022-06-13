// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./GameManager";
import TaskCell from "./TaskCell";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskManager extends cc.Component {
    @property(cc.Node)
    scrollContentNode: cc.Node = null;

    @property(cc.Prefab)
    taskCell: cc.Prefab = null;

    saveTaskConfig = ''

    gm:GameManager

    onLoad(){
        this.saveTaskConfig = cc.sys.localStorage.getItem("taskConfig");

        this.gm=cc.find("Canvas").getComponent(GameManager);
        
        for (let i = 0; i <this.gm.TASKCONFIG.length; i++) {
            let newTaskCell = cc.instantiate(this.taskCell);
            newTaskCell.setParent(this.scrollContentNode);
            if(this.saveTaskConfig!=null){
                let s = JSON.parse(this.saveTaskConfig);
                newTaskCell.getComponent(TaskCell).init(s[i]);
            }else{
                newTaskCell.getComponent(TaskCell).init(this.gm.TASKCONFIG[i]);
            }
        }
        this.scrollContentNode.height=this.scrollContentNode.children[0].height*this.scrollContentNode.childrenCount;
    }

    protected onEnable(): void {
        for (let i = 0; i < this.scrollContentNode.childrenCount; i++) {
            if(this.saveTaskConfig!=null){
                let s = JSON.parse(this.saveTaskConfig);
                this.scrollContentNode.children[i].getComponent(TaskCell).init(s[i]);
            }else{
                this.scrollContentNode.children[i].getComponent(TaskCell).init(this.gm.TASKCONFIG[i]);
            }
        }
    }

    public updateTask(){
        for (let i = 0; i < this.scrollContentNode.childrenCount; i++) {
            this.scrollContentNode.children[i].getComponent(TaskCell).upgradeTaskProcess();
        }
    }
}
