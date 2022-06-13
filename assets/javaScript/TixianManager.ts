// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TixianManager extends cc.Component {

    @property(cc.Node)
    tipNode: cc.Node = null;

    @property(cc.Node)
    contentNode: cc.Node = null;

    @property(cc.Node)
    chouJiangNode: cc.Node = null;

    @property([cc.Node])
    fiveBtns: cc.Node[] = [];

    tipNodeOldHeight=0

    contentNdoeOldHeight=0;

    onLoad(){
        this.tipNodeOldHeight=this.tipNode.height;
        this.contentNdoeOldHeight=this.contentNode.height;
        this.chouJiangNode.active=false;
        for (let i = 0; i < this.fiveBtns.length; i++) {
            this.fiveBtns[i].on(cc.Node.EventType.TOUCH_START,this.selectMoneyValue,this)
        }

        cc.game.on("choujiang",this.showChouJiangNode,this);
    }

    showChouJiangNode(){
        this.chouJiangNode.active=true;
    }

    selectMoneyValue(e){
        let value = e.target.children[0].getComponent(cc.Label).string;
        this.tipNode.height=this.tipNodeOldHeight;
        this.contentNode.height=this.contentNdoeOldHeight;
        if(value=="0.3元"){
            this.tipNode.height+=50;
            this.contentNode.height+=50;
        }else if(value=="300元"){
            this.tipNode.height+=50;
            this.contentNode.height+=60;
        }else if(value=="500元"){
            this.tipNode.height+=50;
            this.contentNode.height+=70;
        }else if(value=="1000元"){
            this.tipNode.height+=50;
            this.contentNode.height+=80;
        }else if(value=="2000元"){
            this.tipNode.height+=50;
            this.contentNode.height+=90;
        }
    }

    protected onDisable(): void {
        this.tipNode.height=this.tipNodeOldHeight;
        this.contentNode.height=this.contentNdoeOldHeight;
    }
}
