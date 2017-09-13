
module game {

    export class GameCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

        public constructor() {
            super();
        }
        public static NAME: string = "GameCommand";

        /**
         * 匹配对手
         */
        public static MATCH_PLAYER: string = "match_player";
        /**
         * 开始游戏
         */
        public static START_GAME: string = "start_game";

        /**
         * 结束游戏
         */
        public static FINISH_GAME: string = "finish_game";

        /**
         * 更新底池
         */
        public static UPDATE_POT: string = "update_pot";

        /**
         * 执行操作 , body  0: Bet, 1: Call, 2:Fold, 3: Check,4: raise 5 All-in
         */
        public static ACTION: string = "action";

        /**
         * 注册消息
         */
        public register(): void {
            this.facade.registerCommand(GameCommand.MATCH_PLAYER, GameCommand);
            this.facade.registerCommand(GameCommand.START_GAME, GameCommand);
            this.facade.registerCommand(GameCommand.FINISH_GAME, GameCommand);
            this.facade.registerCommand(GameCommand.UPDATE_POT, GameCommand);
            this.facade.registerCommand(GameCommand.ACTION, GameCommand);
        }

        public execute(notification: puremvc.INotification): void {
            var gameProxy: GameProxy = <GameProxy><any>(this.facade.retrieveProxy(GameProxy.NAME));
            var matchProxy: MatchProxy = <MatchProxy><any>(this.facade.retrieveProxy(MatchProxy.NAME));
            //var gridProxy: GridProxy = <GridProxy><any>(this.facade.retrieveProxy(GridProxy.NAME));
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case GameCommand.MATCH_PLAYER: {
                    matchProxy.matchPlayer();
                    break;
                }
                case GameCommand.START_GAME: {
                    matchProxy.startGame();
                    //gameProxy.reset();
                    //gridProxy.reset();
                    //gridProxy.addStartTiles();
                    break;
                }
                case GameCommand.UPDATE_POT: {
                    //gameProxy.updateScore(data);
                    break;
                }
                case GameCommand.ACTION: {
                    //gridProxy.move(<number><any>data);
                    gameProxy.playAction(<any>data);
                    break;
                }
                case GameCommand.FINISH_GAME: {
                    if (data) {
                        //gameProxy.setResult(data);
                        this.sendNotification(LobbyCommand.SHOW_END);
                    }
                    else {
                        //gameProxy.quit();
                        //gridProxy.reset();
                        this.sendNotification(LobbyCommand.CHANGE, 1);
                    }
                    break;
                }
            }
        }
    }
}