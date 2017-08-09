/**
 * Created by xzper on 2014/11/15.
 */
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
    var LobbyCommand = (function (_super) {
        __extends(LobbyCommand, _super);
        function LobbyCommand() {
            return _super.call(this) || this;
        }
        /**
         * 注册消息
         */
        LobbyCommand.prototype.register = function () {
            this.facade.registerCommand(LobbyCommand.CHANGE, LobbyCommand);
            this.facade.registerCommand(LobbyCommand.SHOW_SETTING, LobbyCommand);
            this.facade.registerCommand(LobbyCommand.SHOW_END, LobbyCommand);
        };
        LobbyCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var appMediator = this.facade.retrieveMediator(game.ApplicationMediator.NAME);
            switch (notification.getName()) {
                case LobbyCommand.CHANGE: {
                    if (data == 1)
                        appMediator.main.enterLobbyScreen();
                    else
                        appMediator.main.enterGameScreen();
                    break;
                }
                case LobbyCommand.SHOW_SETTING: {
                    appMediator.main.showSettingWindow(data);
                    break;
                }
                case LobbyCommand.SHOW_END: {
                    egret.setTimeout(function () {
                        appMediator.main.showEndWindow();
                    }, this, 300);
                    break;
                }
            }
        };
        LobbyCommand.NAME = "SceneCommand";
        /**
         * 切换场景
         */
        LobbyCommand.CHANGE = "scene_change";
        /**
         * 显示设置界面
         */
        LobbyCommand.SHOW_SETTING = "scene_setting";
        /**
         * 显示结束窗口
         */
        LobbyCommand.SHOW_END = "scene_end";
        return LobbyCommand;
    }(puremvc.SimpleCommand));
    game.LobbyCommand = LobbyCommand;
    __reflect(LobbyCommand.prototype, "game.LobbyCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=LobbyCommand.js.map