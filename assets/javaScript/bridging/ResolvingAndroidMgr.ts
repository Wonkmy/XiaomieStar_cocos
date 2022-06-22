// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ResolvingAndroidMgr extends cc.Component {

    public getInfoFromAndroid(){
        return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/Test", "hello", "(Ljava/lang/String;)V", "this is a message from js");
    }

    test(){
        let resp = this.getInfoFromAndroid();
        //{"code":100,"message":"",content:null}
        let infoContent = JSON.parse(resp);
        if(infoContent.code==100){
            return "success"
        }
    }
}
