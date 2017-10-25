module game {

    export class LobbyProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "LobbyProxy";

		public constructor() {
			super(LobbyProxy.NAME);

			NetController.getInstance().addListener(Commands.REFRESH_DATA, this);
		}

		public refreshUserData() {
			NetController.getInstance().addSocketStateListener(NetController.CONNECTSUCCEED, this.connectLoginSuccess, this);
            if (NetController.getInstance().isConnected(NetController.LOGINSOCKET)) {
				this.sendUpdateUserDataRequest();
			} else {
                NetController.getInstance().connectLogin();
            }
		}

		public connectLoginSuccess(evt: egret.Event) {
            switch (evt.data) {
                //匹配服务连接成功发送用户id
                case "login":
                    this.sendUpdateUserDataRequest();
                    break;
            }
        }

		public sendUpdateUserDataRequest() {
			var data: BaseMsg = new BaseMsg();
			data.command = Commands.REFRESH_DATA;
			data.content = { "uid" : UserUtils.getInstance().getOwnUser().uId};
			NetController.getInstance().sendData(NetController.LOGINSOCKET, data);
            NetController.getInstance().removeSocketStateListener(NetController.CONNECTSUCCEED, this.connectLoginSuccess, this);
		}

        /**收到服务器消息*/
        private onReciveMsg(data: BaseMsg) {
            let command = data.command;
            console.warn('onReciveMsg', command);
            switch (command) {
                //游客登录
                case Commands.REFRESH_DATA: {
                    if (data.content.uid) {
                        UserUtils.getInstance().getOwnUser().name = data.content.name;
                        UserUtils.getInstance().getOwnUser().uId = data.content.uid;
                        UserUtils.getInstance().getOwnUser().money = data.content.money;
                        this.sendNotification(LobbyMediator.REFRESH_USERDATA);
                    }
                }
            }
        }
	}
}