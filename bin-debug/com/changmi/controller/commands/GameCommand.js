var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var GameCommand = (function (_super) {
        __extends(GameCommand, _super);
        function GameCommand() {
            return _super.call(this) || this;
        }
        /**
         * 注册消息
         */
        GameCommand.prototype.register = function () {
            this.facade.registerCommand(GameCommand.START_GAME, GameCommand);
            this.facade.registerCommand(GameCommand.FINISH_GAME, GameCommand);
            this.facade.registerCommand(GameCommand.UPDATE_SCORE, GameCommand);
            this.facade.registerCommand(GameCommand.MOVE_TILE, GameCommand);
        };
        GameCommand.prototype.execute = function (notification) {
            var gameProxy = (this.facade.retrieveProxy(game.GameProxy.NAME));
            //var gridProxy: GridProxy = <GridProxy><any>(this.facade.retrieveProxy(GridProxy.NAME));
            var data = notification.getBody();
            switch (notification.getName()) {
                case GameCommand.START_GAME: {
                    this.sendNotification(game.LobbyCommand.CHANGE, 2);
                    //gameProxy.reset();
                    //gridProxy.reset();
                    //gridProxy.addStartTiles();
                    break;
                }
                case GameCommand.UPDATE_SCORE: {
                    //gameProxy.updateScore(data);
                    break;
                }
                case GameCommand.MOVE_TILE: {
                    //gridProxy.move(<number><any>data);
                    break;
                }
                case GameCommand.FINISH_GAME: {
                    if (data) {
                        //gameProxy.setResult(data);
                        this.sendNotification(game.LobbyCommand.SHOW_END);
                    }
                    else {
                        //gameProxy.quit();
                        //gridProxy.reset();
                        this.sendNotification(game.LobbyCommand.CHANGE, 1);
                    }
                    break;
                }
            }
        };
        GameCommand.NAME = "GameCommand";
        /**
         * 开始游戏
         */
        GameCommand.START_GAME = "start_game";
        /**
         * 结束游戏
         */
        GameCommand.FINISH_GAME = "finish_game";
        /**
         * 更新分数
         */
        GameCommand.UPDATE_SCORE = "update_score";
        /**
         * 执行移动 , body  0: 上, 1: 右, 2:下, 3: 左
         */
        GameCommand.MOVE_TILE = "move_tile";
        return GameCommand;
    }(puremvc.SimpleCommand));
    game.GameCommand = GameCommand;
    __reflect(GameCommand.prototype, "game.GameCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=GameCommand.js.map