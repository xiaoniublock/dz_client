

module game {

    export class ApplicationMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "ApplicationMediator";
        /**进入大厅 */
        public static ENTER_LOBBY: string = "enterLobbyScreen";
        /**进入等待页面 */
        public static ENTER_LOADING: string = "enterLoadingScreen";
        /**进入游戏 */
        public static ENTER_GAME: string = "enterGameScreen";
        public constructor(viewComponent: any) {
            super(ApplicationMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                ApplicationMediator.ENTER_LOBBY,
                ApplicationMediator.ENTER_LOADING,
                ApplicationMediator.ENTER_GAME
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case ApplicationMediator.ENTER_LOBBY: {
                    this.main.enterLobbyScreen();
                } break;
                case ApplicationMediator.ENTER_LOADING: {
                    this.main.enterLoadingScreen();
                } break;
                case ApplicationMediator.ENTER_GAME: {
                    this.main.enterGameScreen();
                } break;
            }
        }

        public get main(): AppContainer {
            return <AppContainer><any>(this.viewComponent);
        }
    }
}