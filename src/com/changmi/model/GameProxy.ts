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
        public static FOLD: string = "fold";
        /**
         * 全下
         */
        public static AllIN: string = "all-in";
        /**
         * 发公共牌
         */
        public static POP_PUBLICCARD: string = "pop_publiccard";
        /**
         * 发牌
         */
        public static POP_CARD: string = "pop_card";
        /**
         * 结束
         */
        public static RESULT: string = "result";
        /**
         * 重置桌上信息
         */
        public static GAME_RESET: string = "game_reset";

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
            var msg = new BaseMsg();
            msg.command = Commands.PLAYERBET;
            switch (data.action) {
                case Actions.bet:
                msg.content = { "action": Actions.bet, "uId": UserUtils.getInstance().getOwnUser().uId, "tId": UserUtils.getInstance().getOwnUser().tId , "raiseStack":data.raiseStack};
                    break;
                case Actions.allin:
                 msg.content = { "action": Actions.allin, "uId": UserUtils.getInstance().getOwnUser().uId, "tId": UserUtils.getInstance().getOwnUser().tId , "raiseStack":UserUtils.getInstance().getOwnUser().money};
                    break;
                case Actions.giveup:
                 msg.content = { "action": Actions.giveup, "uId": UserUtils.getInstance().getOwnUser().uId, "tId": UserUtils.getInstance().getOwnUser().tId , "raiseStack":0};
                    break;
                case Actions.pass:
                 msg.content = { "action": Actions.pass, "uId": UserUtils.getInstance().getOwnUser().uId, "tId": UserUtils.getInstance().getOwnUser().tId , "raiseStack":0};
                    break;
            }
            NetController.getInstance().sendData(NetController.GAMESOCKET,msg);
        }
        public sendReady() {
            var data: BaseMsg = new BaseMsg();
            data.command = Commands.INIT_PLAYER;
            data.content = { "uId": UserUtils.getInstance().getOwnUser().uId, "tId": UserUtils.getInstance().getOwnUser().tId, "code": "0" };
            NetController.getInstance().sendData(NetController.GAMESOCKET, data);
        }

        public resetTable(){
           this.sendNotification(GameProxy.GAME_RESET);
           
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
                    this.sendNotification(GameProxy.CHECK, data.content);
                    this.sendNotification(GameProxy.REM_USER, UserUtils.getInstance().popUser(data.content["uid"]));
                    break;
                //玩家各种操作
                case Commands.PLAYERBET:
                    if (data.content)
                        this.onRecivePlayGame(data.content);
                    break;
                //开始发公共牌
                case Commands.PUSH_PUBLICCARD:
                    if (data.content){
                        //第一次发公共牌
                        if (data.content.times == 1){
                            CardUtils.getInstance().putPublicCards(data.content.poker);
                        }else{
                            var cardNumber = data.content.poker[0];
                            CardUtils.getInstance().addPublicCard(cardNumber);
                        }
                        this.sendNotification(GameProxy.POP_PUBLICCARD,data.content);
                    }

                        
                    //this.onRecivePlayGame(data.content);
                    break;
                //给每个人发手牌
                case Commands.PUSH_OWNCARD:
                    this.sendNotification(GameProxy.POP_CARD, data.content);
                    break;
                //游戏判定
                case Commands.RESULT:
                    this.sendNotification(GameProxy.RESULT, data.content);
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
                case Actions.bet:
                    this.sendNotification(GameProxy.ADD_CHIP, content);
                    // this.my_cards = content.cards.sort(function(a,b){return b-a});
                    // this.refreshMyCard(this.my_cards);
                    break;
                case Actions.pass:
                    this.sendNotification(GameProxy.CHECK, content);
                    //this.onGamePlay(content);
                    break;
                case Actions.allin:
                    this.sendNotification(GameProxy.AllIN, content);
                    //this.onGameOver(content);
                     break;
                case Actions.giveup:
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
    public static bet = 1;
    public static pass = 2;
    public static allin = 3;
    public static giveup = 4;
    public static giveUpOrPass=5;
    public static autoPass=6;
    public static followAny=7;

}

class Operator {
    public static pass = 1;
    public static follow = 2;
    public static allIn = 3;
}