module game {

    export class LobbyMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "LobbyScreenMediator";

        /**刷新界面 */
        public static REFRESH_USERDATA: string = "refresh_userdata";

        public constructor(viewComponent: any) {
            super(LobbyMediator.NAME, viewComponent);

            this.lobbyScreen.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClick, this);
            this.lobbyScreen.btn_match.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClick, this);
            this.lobbyScreen.btn_game.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClick, this);
            this.lobbyScreen.btn_friendsGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClick, this);

            this.lobbyScreen.btn_diamonds_plus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.plusDiamonds, this);
            this.lobbyScreen.btn_gold_plus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.plusGold, this);
            this.lobbyScreen.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeTONormal, this);

            this.lobbyScreen.addEventListener(egret.Event.ADDED_TO_STAGE, this.requestUserData, this);
        }

        public ButtonClick(event: egret.TouchEvent) {
            SoundManager.getIns().playSound("all_buttons_mp3");

            switch (event.currentTarget.name) {
                case this.lobbyScreen.btn_start.name:
                    this.sendNotification(GameCommand.MATCH_PLAYER);
                    break;
                case this.lobbyScreen.btn_match.name:
                    break;
                case this.lobbyScreen.btn_game.name:
                    break;
            }

        }

        public listNotificationInterests(): Array<any> {
            return [
                LobbyMediator.REFRESH_USERDATA
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case LobbyMediator.REFRESH_USERDATA: {
                    this.lobbyScreen.resetUser();
                    break;
                }
            }
        }
        public plusDiamonds() {
            this.lobbyScreen.skin.currentState = "diamond_buy";
            SoundManager.getIns().playSound("appear_mp3")
            this.lobbyScreen.recharge.play(0);
        }
        public plusGold() {
            this.lobbyScreen.skin.currentState = "coin_conver";
            SoundManager.getIns().playSound("appear_mp3")
            this.lobbyScreen.recharge.play(0);
        }
        public changeTONormal() {
            this.lobbyScreen.skin.currentState = "normal";
            SoundManager.getIns().playSound("disappear_mp3")
        }

        public requestUserData() {
            this.sendNotification(LobbyCommand.REFRESH_DATA);
        }

        public get lobbyScreen(): LobbyScreen {
            return <LobbyScreen><any>(this.viewComponent);
        }

    }
}