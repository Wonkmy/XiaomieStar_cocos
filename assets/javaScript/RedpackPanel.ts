// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataDefine from "./DataDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RedpackPanel extends cc.Component {

    @property(cc.Label)
    redpackLabel: cc.Label = null;

    @property(cc.Node)
    grow_node: cc.Node = null;

    redPackMoneyNum=0

    protected onLoad(): void {
        // cc.tween(this.grow_node)
        //     .repeatForever(
        //         cc.tween().by(0.5,{scale:0.3}).by(0.5,{scale:-0.3})
        //     )
        //     .start()
    }

    protected onEnable(): void {
        if(window.game.numLevel<=20){
            this.redPackMoneyNum=this.myrandom(3,5);
        }
        else if(window.game.numLevel<=60){
            this.redPackMoneyNum=this.myrandom(2,3);
        }
        else if(window.game.numLevel<=120){
            this.redPackMoneyNum=this.myrandom(1,2);
        }else{
            this.redPackMoneyNum=this.myrandom(0,2);
        }

        this.redpackLabel.string="+"+this.redPackMoneyNum.toString()+"元";

        let saveMoneyNum = cc.sys.localStorage.getItem("userMoney");//这里获取用户的钱数暂时从本地获取，后面再从服务器上获取
        if(saveMoneyNum!=null){
            let saveData = JSON.parse(saveMoneyNum);
            DataDefine.curAddMoneyNumber =saveData.money + this.redPackMoneyNum;
        }else{
            DataDefine.curAddMoneyNumber=this.redPackMoneyNum;
        }
        

        let userMoney = {
            name: 'steve',
            money : DataDefine.curAddMoneyNumber
        };

        cc.sys.localStorage.setItem("userMoney",JSON.stringify(userMoney));
    }

   myrandom(lower:number, upper:number) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
   }
}
