var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var AppContainer = (function (_super) {
        __extends(AppContainer, _super);
        function AppContainer() {
            var _this = _super.call(this) || this;
            _this.lobbyScreen = new game.LobbyScreen();
            _this.gameScreen = new game.GameScreen();
            return _this;
        }
        AppContainer.prototype.enterLobbyScreen = function () {
            console.warn("进入大厅");
            this.removeChildren();
            this.addChild(this.lobbyScreen);
        };
        AppContainer.prototype.enterGameScreen = function () {
            this.removeChildren();
            this.addChild(this.gameScreen);
        };
        AppContainer.prototype.showSettingWindow = function (data) {
        };
        AppContainer.prototype.showEndWindow = function () {
        };
        return AppContainer;
    }(egret.Sprite));
    game.AppContainer = AppContainer;
    __reflect(AppContainer.prototype, "game.AppContainer");
})(game || (game = {}));
//# sourceMappingURL=AppContainer.js.map