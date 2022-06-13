// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerCenter extends cc.Component {

    @property(cc.Node)
    xieyi: cc.Node = null;

    @property(cc.Node)
    tiaokuan: cc.Node = null;

    @property(cc.Node)
    guanyu: cc.Node = null;

    @property(cc.Node)
    zhuxiao: cc.Node = null;


    @property(cc.Node)
    frameSpr: cc.Node = null;

    onLoad(){
        this.xieyi.on(cc.Node.EventType.TOUCH_END,this.onBtnClick,this);
        this.tiaokuan.on(cc.Node.EventType.TOUCH_END,this.onBtnClick,this);
        this.guanyu.on(cc.Node.EventType.TOUCH_END,this.onBtnClick,this);
        this.zhuxiao.on(cc.Node.EventType.TOUCH_END,this.onBtnClick,this);
    }

    closeSecondFrame(){
        this.frameSpr.active=false;
    }

    onBtnClick(str){
        this.frameSpr.active=true;
        if(str.currentTarget.name=="xieyi"){
            this.frameSpr.children[0].children[0].getComponent(cc.Label).string="这是协议";
        }else if(str.currentTarget.name=="tiaokuan"){
            this.frameSpr.children[0].children[0].getComponent(cc.Label).string="这是条款";
        }else if(str.currentTarget.name=="guanyu"){
            this.frameSpr.children[0].children[0].getComponent(cc.Label).string="这是关于";
        }else if(str.currentTarget.name=="zhuxiao"){
            this.frameSpr.children[0].children[0].getComponent(cc.Label).string="这是注销";
        }
    }
}
