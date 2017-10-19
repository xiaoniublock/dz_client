// TypeScript file
module game {

    export class MatchProxy extends puremvc.Proxy implements puremvc.IProxy {
        public clientDisconnect: boolean = false;  //false为本地主动断开，true为服务器忽然断开
        public static NAME: string = "MatchProxy";
        /**
         * 匹配成功返回这张桌子上的玩家数据
         */

        public constructor() {
            super(MatchProxy.NAME);
            NetController.getInstance().addListener(Commands.MATCH_PLAYER, this);
            NetController.getInstance().addListener(Commands.REQUIRE_TABLEID, this);

            NetController.getInstance().addSocketStateListener(NetController.CONNECTSUCCEED, this.stateFunction, this);
            NetController.getInstance().addSocketStateListener(NetController.CLOSESUCCEED, this.disconnectFunction, this);
            NetController.getInstance().addSocketStateListener(NetController.CONNECTERROR, this.connectErrorFunction, this);
        }
        /**开始匹配游戏*/
        public matchPlayer() {
            
            NetController.getInstance().connectMatch();
            // NetController.getInstance().connectGame();
            // 打开加载中界面
            this.sendNotification(LobbyCommand.CHANGE, 2);
            this.sendNotification(LoadMediator.BEGIN_ROTATE);
            // this.start.enabled = false;
            // this.tipTween();

        }
        private stateFunction(evt: egret.Event) {
            console.log(evt.data);
            switch (evt.data) {
                //匹配服务连接成功发送用户id
                case "match":
                    var data = new BaseMsg();
                    data.command = Commands.REQUIRE_TABLEID;
                    data.content = { "uId": UserUtils.getInstance().getOwnUser().uId };
                    NetController.getInstance().sendData(NetController.MATCHSOCKET, data);
                    break;
                //游戏服务连接成功发送桌子id
                case "game":
                    var data = new BaseMsg();
                    data.command = Commands.MATCH_PLAYER;
                    data.content = { "uId": UserUtils.getInstance().getOwnUser().uId, "tId": UserUtils.getInstance().getOwnUser().tId };
                    NetController.getInstance().sendData(NetController.GAMESOCKET, data);
                    break;
            }

        }
        private disconnectFunction(evt: egret.Event) {
            switch (evt.data) {
                //匹配服务连接成功发送用户id
                case "match":{
                    //如果是服务器主动断开则走条件1，客户端主动断开则走条件2
                    if (this.clientDisconnect) {
                        this.clientDisconnect = false;
                    } else {
                        this.sendNotification(LobbyCommand.CHANGE, 1);
                    }
                    break;
                }
                case "game":{
                    game.TextUtils.showTextTip(NetController.getInstance().isConnected(NetController.GAMESOCKET)?"未断开":"断开");
                }
            }
        }
        private connectErrorFunction(evt: egret.Event) {
            switch (evt.data) {
                //匹配服务连接成功发送用户id
                case "match":{
                    this.sendNotification(LobbyCommand.CHANGE, 1);
                    game.TextUtils.showTextTip("系统出错，嗷了个嗷！！！");
                }
            }
        }
        /**收到服务器消息*/
        private onReciveMsg(data: BaseMsg) {
            let command = data.command;
            console.warn('onReciveMsg', command);
            switch (command) {
                //匹配桌子
                case Commands.REQUIRE_TABLEID: {
                    console.warn("onGetTableId" + data);
                    if (data.content.tId >= 0) {
                        UserUtils.getInstance().getOwnUser().tId = data.content.tId;
                        NetController.getInstance().connectGame();
                    } else {
                        game.TextUtils.showTextTip("匹配失败，嗷了个嗷！！！");
                        this.sendNotification(LoadMediator.STOP_ROTATE);
                        this.sendNotification(LobbyCommand.CHANGE, 1);
                    }
                    this.clientDisconnect = true;
                    NetController.getInstance().close(NetController.MATCHSOCKET);
                    break;
                }
                //加入玩家，更新界面
                case Commands.MATCH_PLAYER: {
                    this.sendNotification(LoadMediator.STOP_ROTATE);
                    UserUtils.getInstance().initUsers(data.content["user"]);
                    CardUtils.getInstance().putPublicCards(data.content["poker"]);
                    CachePool.addObj("jackpot", data.content["jackpot"]);
                    CachePool.addObj("ready", data.content["ready"]);
                    CachePool.addObj("time", data.content["time"]);
                    this.sendNotification(GameCommand.START_GAME);
                    break;
                }
            }
        }
    }
}