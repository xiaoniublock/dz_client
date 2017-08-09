module game {

    export class GameMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "GameScreenMediator";

        public constructor(viewComponent: any) {
            super(LobbyMediator.NAME, viewComponent);

            this.gameScreen.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backButtonClick, this);
        }

        public backButtonClick(event: egret.TouchEvent){
            console.warn("点击返回");
            this.sendNotification(LobbyCommand.CHANGE, 1);
        }

        public get gameScreen(): GameScreen {
            return <GameScreen><any>(this.viewComponent);
        }

    }
}