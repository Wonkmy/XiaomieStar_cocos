// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataDefine from "./DataDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FinishLevelSlider extends cc.Component {
    @property(cc.ProgressBar)
    crossLevelProgress: cc.ProgressBar = null;

    @property(cc.Label)
    level_shengxia: cc.Label = null;

    @property(cc.Label)
    progress_label: cc.Label = null;

    protected onLoad(): void {

        let crossLevel = cc.sys.localStorage.getItem("curCrossedLevel");
        if(crossLevel!=null){
            DataDefine.curCrossedLevelNumber=parseInt(JSON.parse(crossLevel));
        }else{
            DataDefine.curCrossedLevelNumber=1;
        }
        

        this.level_shengxia.string =String(20-(DataDefine.curCrossedLevelNumber%20))//20 - 32%20

        this.progress_label.string =String(DataDefine.curCrossedLevelNumber%20+"/"+20);

        let saveprocessData = cc.sys.localStorage.getItem("levelProcess");
            if (saveprocessData != null) {
                let processData = JSON.parse(saveprocessData);
                let newMoney = processData.process
                this.crossLevelProgress.progress=newMoney
            }else{
                this.crossLevelProgress.progress=0;
            }

        cc.game.on("finishLevel",()=>{
            this.crossLevelProgress.progress+=0.05;
            if(this.crossLevelProgress.progress>=1){
                this.crossLevelProgress.progress=0;
            }
            let processData={
                process:this.crossLevelProgress.progress
            }
            this.level_shengxia.string =String(20-(DataDefine.curCrossedLevelNumber%20))
            this.progress_label.string =String(DataDefine.curCrossedLevelNumber%20+"/"+20);
            cc.sys.localStorage.setItem("levelProcess",JSON.stringify(processData))
        },this);

    }
}
