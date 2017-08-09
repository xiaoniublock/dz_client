module game {

    export class LobbyMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "LobbyScreenMediator";

        public constructor(viewComponent: any) {
            super(LobbyMediator.NAME, viewComponent);

            this.lobbyScreen.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startButtonClick, this);
        }

        public startButtonClick(event: egret.TouchEvent){
            this.sendNotification(GameCommand.START_GAME);
        }

        public get lobbyScreen(): LobbyScreen {
            return <LobbyScreen><any>(this.viewComponent);
        }

    }
}