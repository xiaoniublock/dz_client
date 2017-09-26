module game {

    export class GameProxy extends puremvc.Proxy implements puremvc.IProxy {
        public static NAME: string = "GameProxy";
        /**
         * 改变底部按钮组
         */
        public static CHANGE_STATE: string = "change_state";
        /**
        * 加入玩家
        */
        public static ADD_USER: string = "add_user";

        /**
        * 去除玩家
        */
        public static REM_USER: string = "rem_user";

        /**
         * 下注操作
         */
        public static ADD_CHIP: string = "add_chip";
        /**
         * 让牌
         */
        public static CHECK: string = "check";
        /**
         * 弃牌
         */
        public static FOLD : string = "fold";
        /**
         * 全下
         */
        public static AllIN : string = "all-in";
        /**
         * 发牌
         */
        public static POP_CARD: string = "pop_card";

        private _nextStep: number;


        public constructor() {
            super(GameProxy.NAME);
            NetController.getInstance().addListener(Commands.PLAYERBET, this);
            NetController.getInstance().addListener(Commands.PUSH_PUBLICCARD, this);
            NetController.getInstance().addListener(Commands.PUSH_OWNCARD, this);
            NetController.getInstance().addListener(Commands.ADD_PLAYER, this);
            NetController.getInstance().addListener(Commands.REM_PLAYER, this);
            NetController.getInstance().addListener(Commands.RESULT, this);
            NetController.getInstance().addListener(Commands.BANKER_PLAYER, this);
        }

        /**
         * 根据传过来的信息判断操作，是让，弃牌，下注等操作，然后sendData
         */
        public playAction(data: any) {
            console.log(<String>data);
            var msg = new BaseMsg();
            msg.command = Commands.PLAYERBET;
            msg.content = { "name": "112" };
            switch (data) {
                case Actions.giveup:

                    break;
                case Actions.pass:

                    break;
                default://不是弃牌不是让牌，那就是下注咯

                    break;
            }
            // NetController.getInstance().sendData(NetController.GAMESOCKET,msg);
        }
        public sendReady(){
            var data:BaseMsg = new BaseMsg();
            data.command = Commands.INIT_PLAYER;
            data.content = { "uId": UserUtils.getInstance().getOwnUser().uId, "tId": "1" ,"code":"0"};
            NetController.getInstance().sendData(NetController.GAMESOCKET,data);
        }

        /**收到服务器消息*/
        private onReciveMsg(data: BaseMsg) {
            let command = data.command;
            console.warn('onReciveMsg', command);
            switch (command) {
                //加入玩家，更新界面
                case Commands.ADD_PLAYER:
                    this.sendNotification(GameProxy.ADD_USER, UserUtils.getInstance().pushUser(data.content["user"]));
                    break;
                //玩家退出，更新界面
                case Commands.REM_PLAYER:
                    this.sendNotification(GameProxy.REM_USER, UserUtils.getInstance().popUser(data.content["uId"]));
                    break;
                //玩家各种操作
                case Commands.PLAYERBET:
                if(data.content)
                    this.onRecivePlayGame(data.content);
                    break;
                //开始发公共牌
                case Commands.PUSH_PUBLICCARD:
                    //this.onRecivePlayGame(data.content);
                    break;
                //给每个人发手牌
                case Commands.PUSH_OWNCARD:
                      this.sendNotification(GameProxy.POP_CARD, data.content);
                    break;
                //游戏判定
                case Commands.RESULT:
                    //this.onRecivePlayGame(data.content);
                    break;
                //确定庄家
                 case Commands.BANKER_PLAYER:
                    //this.onRecivePlayGame(data.content);
                    break;

            }
        }

        /**房间消息*/
        private onRecivePlayGame(content): void {
            //1-下注/加注，2-让牌，3-全下，4-弃牌
            let action = content.action;
            console.warn('action', action);
            if (action == undefined) return;
            switch (action) {
                case 1:
                    this.sendNotification(GameProxy.ADD_CHIP, content);
                    // this.my_cards = content.cards.sort(function(a,b){return b-a});
                    // this.refreshMyCard(this.my_cards);
                    break;
                case 2:
                 this.sendNotification(GameProxy.CHECK, content);
                    //this.onGamePlay(content);
                    break;
                case 3:
                 this.sendNotification(GameProxy.AllIN, content);
                    //this.onGameOver(content);
                     break;
                case 4:
                 this.sendNotification(GameProxy.FOLD, content);
                    //this.onGameOver(content);
                    break;

            }
        }
        public set nextStep(nextStep: number) {
            this._nextStep = nextStep;
        }
        public get nextStep(): number {
            return this._nextStep;
        }

    }
    /**基本操作代码*/
}
class Actions {
    public static giveup = 1;
    public static pass = 2;
    public static giveUpOrPass = 3;
    public static followAny = 4;
    public static autoPass = 5;

}