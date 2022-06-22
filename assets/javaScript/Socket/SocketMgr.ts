// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import HttpUtil from "./utils/HttpUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SocketMgr extends cc.Component {

    basePath="http://82.157.113.125:8096/api/fkxiaoxiaole/"

    xhr:XMLHttpRequest

    start () {
        this.login_server();

        // cc.find("Canvas").on(cc.Node.EventType.TOUCH_START,()=>{
            
        // },this)
    }

    paramsParse(params){
        let retStr = "";
        for (let k in params) {
            let v = params[k];
            if(typeof(v) == "object"){
                v = JSON.stringify(v);
            }
            if(retStr != ""){
                retStr += "&";
            }
            retStr += (k + "=" + v);
        }
        return retStr;
    }  


    login_server(){
        //#region 
        // var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
        // httpRequest.open('POST','http://82.157.113.125:8096/api/fkxiaoxiaole/wx/login', true); //第二步：打开连接
        // let body = {
        //     channel:"1",
        //     deviceId: "952772"
        // }
        // httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // httpRequest.send();//发送请求 将请求头体写在send中
        // /**
        //  * 获取数据后的处理程序
        //  */
        // httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        //     if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
        //         var json = httpRequest.responseText;//获取到服务端返回的数据
        //         console.log(json);
        //     }
        // };
        //#endregion



        //#region POST请求相关，需再研究的
        // let body = {
        //     deviceId:"44332"
        // }
        

        // HttpUtil.POST('http://82.157.113.125:8096/api/fkxiaoxiaole/wx/login',{

        // },(stat,res)=>{
        //     console.log(res);
        // });
        //#endregion

        // HttpUtil.GET('http://82.157.113.125:8096/api/fkxiaoxiaole/user/getBulletScreens',{
            
        // },(stat,res)=>{
        //     console.log(JSON.parse(res).content);
        // });
        let body = {
            channel: "1",
            deviceId: "952772"
        }
        HttpUtil.wechatLogin('http://82.157.113.125:8096/api/fkxiaoxiaole/wx/login',body,(stat,res)=>{
            cc.find("Canvas/tips").getComponent(cc.Label).string=res.message+"\n userId:"+res.content.userId
        })
    }
}
