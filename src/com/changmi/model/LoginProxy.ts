// TypeScript file
module game {

    export class LoginProxy extends puremvc.Proxy implements puremvc.IProxy {
        public static NAME: string = "LoginProxy";
       
        public constructor() {
            super(LoginProxy.NAME);
        }
        /**登录*/
        public Login(data) {
           let loginModel:Login=<Login>data;
            let para = { uname: loginModel.account, pwd: loginModel.password };
            HttpAPI.HttpGET("http://192.168.1.129/login", para, (event) => {
                console.log("登录成功");
                var request = <egret.HttpRequest>event.currentTarget;
                // let own: User = new User();
                // console.log("post data : ", JSON.parse(request.response).id);
                // own.uId = JSON.parse(request.response).id;
                // UserUtils.getInstance().saveOwnUser(own);
            }, (event) => {
                console.log("登录失败");
                var request = <egret.HttpRequest>event.currentTarget;
                console.log("post data : ", request.response);
            }, this);
            let own: User = new User();
            own.uId = loginModel.account;//JSON.parse(request.response).id;
            UserUtils.getInstance().saveOwnUser(own);
            this.sendNotification(LoginCommand.ENTER_LOBBY);
        }
    }
}