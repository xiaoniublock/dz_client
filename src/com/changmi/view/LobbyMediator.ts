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

            this.lobbyScreen.addEventListener(egret.Event.ADDED_TO_STAGE, this.requestUserData, this);
        }

        public ButtonClick(event: egret.TouchEvent) {
            switch (event.currentTarget.name) {
                case this.lobbyScreen.btn_start.name:
                    this.sendNotification(GameCommand.MATCH_PLAYER);
                    break;
                case this.lobbyScreen.btn_match:
                    break;
                case this.lobbyScreen.btn_game:
                    break;
            }
            SoundManager.getIns().playSound("all_buttons_mp3");

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

        public requestUserData() {
            this.sendNotification(LobbyCommand.REFRESH_DATA);
        }

        public get lobbyScreen(): LobbyScreen {
            return <LobbyScreen><any>(this.viewComponent);
        }

    }
}