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
    var ApplicationMediator = (function (_super) {
        __extends(ApplicationMediator, _super);
        function ApplicationMediator(viewComponent) {
            return _super.call(this, ApplicationMediator.NAME, viewComponent) || this;
        }
        ApplicationMediator.prototype.listNotificationInterests = function () {
            return [];
        };
        ApplicationMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
            }
        };
        Object.defineProperty(ApplicationMediator.prototype, "main", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        return ApplicationMediator;
    }(puremvc.Mediator));
    ApplicationMediator.NAME = "ApplicationMediator";
    game.ApplicationMediator = ApplicationMediator;
    __reflect(ApplicationMediator.prototype, "game.ApplicationMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=ApplicationMediator.js.map