// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class HttpUtil extends cc.Component {

    /**
     * 延迟多久没回复就返回False
     *
     * @type {number}
     * @memberof DriveManager
     */
     private static TimeOut:number=200;

     /**
      * GET请求
      *
      * @static
      * @param {*} url
      * @param {object} [params={}]
      * @param {*} callback
      * @memberof HttpUtil
      */
     public static GET(url, params: object = {}, callback) {
         let dataStr = '';
         Object.keys(params).forEach(key => {
             dataStr += key + '=' + encodeURIComponent(params[key]) + '&';
         })
         if (dataStr !== '') {
             dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
             url = url + '?' + dataStr;
         }
         // url = HttpUtil.baseUrl + url;
 
         let xhr = cc.loader.getXMLHttpRequest();
         xhr.open("GET", url, true);
         xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
         xhr.onreadystatechange = function () {
             if (xhr.readyState === 4) {
                 let response = xhr.responseText;
                 if (xhr.status >= 200 && xhr.status < 300) {
                     let httpStatus = xhr.statusText;
                     // callback(true, JSON.parse(response));
                     callback(true, response);
                 } else {
                     callback(false, response);
                 }
             }
         };
         xhr.timeout = this.TimeOut;
         xhr.send();
     }
     
     /**
      * POST请求
      *
      * @static
      * @param {*} url
      * @param {object} [param={}]
      * @param {*} callback
      * @memberof HttpUtil
      */
     public static POST(url, param: object={}, callback) {
         // url = HttpUtil.baseUrl + url;
         var xhr = cc.loader.getXMLHttpRequest();
         let dataStr = '';
         Object.keys(param).forEach(key => {
             dataStr += key + '=' + encodeURIComponent(param[key]) + '&';
         })
         if (dataStr !== '') {
             dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
         }
         xhr.open("POST", url, true);
         xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
         xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
         xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
         xhr.onreadystatechange = function () {
             if (xhr.readyState === 4) {
                 let response = xhr.responseText;
                 if (xhr.status >= 200 && xhr.status < 300) {
                     let httpStatus = xhr.statusText;
                     //callback(true, JSON.parse(response));
                     callback(true, response);
 
                 } else {
                     callback(false, response);
                 }
             }
         };
         xhr.send(dataStr);
     }

     /**
      * 微信登陆
      * @param url 请求地址
      * @param data 传入的参数：必须是object类型
      */
    static wechatLogin(url,data,callback) {
        var client = cc.loader.getXMLHttpRequest();//
        let datastr=''
        let isreturn = false
        client.open("POST", url, true);
        client.setRequestHeader("Content-type", "application/json");
        if (data) {
            datastr = JSON.stringify(data)
        }

        client.setRequestHeader("Accept", "*/*");

        client.responseType = "text";

        client.onreadystatechange = (ev: Event) => {
            if (client.readyState < 4) return;
            if (isreturn) {
                return;
            }
            if (client.status === 200) {
                isreturn = true;
                let res = JSON.parse(client.response);
                callback(isreturn,res)
            }
            else {
                isreturn = true;
                console.error("状态错误" + client.statusText);
            }
        };

        client.onerror = (ev: Event) => {
            if (isreturn) {
                return;
            }
            isreturn = true;
            console.error("网络请求出错");
        }

        let log = `发送http请求 请求方式:POST 请求地址:${url}`;


        if (datastr) {
            client.send(datastr);
            log += `?${datastr}`
        } else {
            client.send();
        }
    }
}
