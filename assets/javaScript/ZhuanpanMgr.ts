// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ZhuanpanMgr extends cc.Component {

    
    @property(cc.Node)
    rot_node: cc.Node = null;

    @property(cc.Node)
    star_node: cc.Node = null;

    @property(cc.Button)
    choujiang_btn: cc.Button = null;

    angleInfo = [
        {"angle":0,"reward":1},
        {"angle":60,"reward":2},
        {"angle":120,"reward":3},
        {"angle":180,"reward":4},
        {"angle":240,"reward":5},
        {"angle":300,"reward":6}
    ]

    protected onLoad(): void {
        cc.tween(this.star_node)
            .repeatForever(
                cc.tween().by(0.5,{scale:0.1}).by(0.5,{scale:-0.1})
            )
            .start()
    }

    startRotate(){
        this.choujiang_btn.interactable=false;
        let a = this.myrandom(0,this.angleInfo.length)
        let targetAngle = 720+this.angleInfo[a].angle;
        
        
        cc.tween(this.rot_node)
            .by(3,{angle:targetAngle})
            .call(()=>{
                console.log("当前的角度是："+this.rot_node.angle+"\n"+"获得了"+this.angleInfo[a].reward+"元");
            })
            .start()
    }

    protected onDisable(): void {
        this.rot_node.angle=0;
        this.choujiang_btn.interactable=true;
    }

    


    myrandom(lower:number, upper:number) {
     return Math.floor(Math.random() * (upper - lower)) + lower;
    }

}
