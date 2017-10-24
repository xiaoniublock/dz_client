module game {

    export class LobbyMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "LobbyScreenMediator";

        public constructor(viewComponent: any) {
            super(LobbyMediator.NAME, viewComponent);

            this.lobbyScreen.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClick, this);
            this.lobbyScreen.btn_match.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClick, this);
            this.lobbyScreen.btn_game.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClick, this);
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


        public get lobbyScreen(): LobbyScreen {
            return <LobbyScreen><any>(this.viewComponent);
        }

    }
}