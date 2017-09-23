// TypeScript file
module game {

    export class MatchProxy extends puremvc.Proxy implements puremvc.IProxy {
        public static NAME: string = "MatchProxy";
        /**
         * 匹配成功返回这张桌子上的玩家数据
         */

        public constructor() {
            super(MatchProxy.NAME);
            NetController.getInstance().addListener(Commands.MATCH_PLAYER, this);
        }
        /**开始匹配游戏*/
        public matchPlayer() {
            NetController.getInstance().addSocketStateListener(NetController.CONNECTSUCCEED, this.stateFunction);
            // NetController.getInstance().connectMatch();
            NetController.getInstance().connectGame();
            // 打开加载中界面
            this.sendNotification(LobbyCommand.CHANGE, 2);
            // this.start.enabled = false;
            // this.tipTween();

        }
        private stateFunction(evt: egret.Event) {
            console.log(evt.data);
            switch (evt.data) {
                //匹配服务连接成功发送用户id
                case "match":
                    var data = new BaseMsg();
                    // data.command = Commands.MATCH_PLAYER;
                    data.content = { "uId": "1" };
                    NetController.getInstance().sendData(NetController.MATCHSOCKET, data, (data: BaseMsg) => {
                        console.warn("onGetTableId" + data);
                        NetController.getInstance().close(NetController.MATCHSOCKET);
                        NetController.getInstance().connectGame();
                    }
                        , this);
                    break;
                //游戏服务连接成功发送桌子id
                case "game":
                    var data = new BaseMsg();
                    data.command = Commands.MATCH_PLAYER;
                    data.content = { "uId": "1", "tId": "1" };
                    NetController.getInstance().sendData(NetController.GAMESOCKET, data);
                    break;
            }

        }
        /**收到服务器消息*/
        private onReciveMsg(data: BaseMsg) {
            let command = data.command;
            console.warn('onReciveMsg', command);
            switch (command) {
                //加入玩家，更新界面
                case Commands.MATCH_PLAYER:
                    console.warn("onMatchPlayerBack" + data);
                    UserUtils.getInstance().initUsers(data.content["user"]);
                    CardUtils.getInstance().putPublicCards(data.content["poker"]);
                    CachePool.addObj("jackpot", data.content["jackpot"]);
                    CachePool.addObj("ready", data.content["ready"]);
                    CachePool.addObj("time", data.content["time"]);
                    egret.setTimeout(() => {
                        this.sendNotification(GameCommand.START_GAME);
                        NetController.getInstance().removeSocketStateListener(NetController.CONNECTSUCCEED, this.stateFunction);
                    }, this, 3000);
                    break;
            }
        }

    }
}