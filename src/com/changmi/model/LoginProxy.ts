// TypeScript file
module game {

    export class LoginProxy extends puremvc.Proxy implements puremvc.IProxy {
        public static NAME: string = "LoginProxy";
       
        public constructor() {
            super(LoginProxy.NAME);

            NetController.getInstance().addListener(Commands.TOURIST_LOGIN, this);
        }

        public touristLogin(){
            NetController.getInstance().addSocketStateListener(NetController.CONNECTSUCCEED, this.connectLoginSuccess, this);
            if (NetController.getInstance().isConnected(NetController.LOGINSOCKET)) {
                this.sendTouristLoginRequest();
            } else {
                NetController.getInstance().connectLogin();
            }
        }

        public sendTouristLoginRequest() {
			var data: BaseMsg = new BaseMsg();
            data.command = Commands.TOURIST_LOGIN;
            data.content = { "device_id": CachePool.getObj("uniqueID") };
            NetController.getInstance().sendData(NetController.LOGINSOCKET, data);
            NetController.getInstance().removeSocketStateListener(NetController.CONNECTSUCCEED, this.connectLoginSuccess, this);
		}

        public connectLoginSuccess(evt: egret.Event) {
            switch (evt.data) {
                //匹配服务连接成功发送用户id
                case "login":
                    this.touristLogin();
                    break;
            }
        }

        /**收到服务器消息*/
        private onReciveMsg(data: BaseMsg) {
            let command = data.command;
            console.warn('onReciveMsg', command);
            switch (command) {
                //游客登录
                case Commands.TOURIST_LOGIN: {
                    if (data.content.uid) {
                        var user: User = new User();
                        user.name = data.content.name;
                        user.uId = data.content.uid;
                        user.money = data.content.money;
                        UserUtils.getInstance().saveOwnUser(user);
                        this.sendNotification(LoadAndLoginMediator.TOURIST_LOGIN);
                        NetController.getInstance().close(NetController.LOGINSOCKET);
                    }
                }
            }
        }

        /**登录*/
        public Login(data) {
           let loginModel:Login=<Login>data;
           
            let own: User = new User();
            own.uId = loginModel.account;//JSON.parse(request.response).id;
            UserUtils.getInstance().saveOwnUser(own);
            this.sendNotification(LoginCommand.ENTER_LOBBY);
        }
    }
}