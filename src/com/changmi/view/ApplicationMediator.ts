

module game {

    export class ApplicationMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "ApplicationMediator";
        /**进入预加载登录 */
        public static ENTER_LOADANDLOGIN: string = "enterLoadAndLoginScreen";
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
                ApplicationMediator.ENTER_LOADANDLOGIN,
                ApplicationMediator.ENTER_LOBBY,
                ApplicationMediator.ENTER_LOADING,
                ApplicationMediator.ENTER_GAME
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            switch (notification.getName()) {
                case ApplicationMediator.ENTER_LOADANDLOGIN: {
                    this.main.enterLoadAndLoginScreen();
                } break;
                case ApplicationMediator.ENTER_LOBBY: {
                    this.main.enterLobbyScreen();
                    SoundManager.getIns().playBg("bg_lobby_mp3");
                } break;
                case ApplicationMediator.ENTER_LOADING: {
                    this.main.enterLoadingScreen();
                    SoundManager.getIns().stopBg();
                } break;
                case ApplicationMediator.ENTER_GAME: {
                    this.main.enterGameScreen();
                    SoundManager.getIns().stopBg();
                } break;
            }
        }

        public get main(): AppContainer {
            return <AppContainer><any>(this.viewComponent);
        }
    }
}