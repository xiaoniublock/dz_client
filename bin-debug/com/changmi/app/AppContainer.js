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
    var AppContainer = (function (_super) {
        __extends(AppContainer, _super);
        //public startScreen: StartScreen = new StartScreen();
        //public gameScreen: GameScreen = new GameScreen();
        function AppContainer() {
            return _super.call(this) || this;
        }
        AppContainer.prototype.enterLobbyScreen = function () {
            console.warn("进入大厅");
        };
        AppContainer.prototype.enterGameScreen = function () {
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