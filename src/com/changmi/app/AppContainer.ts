
module game {

    export class AppContainer extends egret.Sprite {
        public lobbyScreen: LobbyScreen = new LobbyScreen();
        public gameScreen: GameScreen = new GameScreen();
        public loadingScreen: LoadScreen = new LoadScreen();
        public currentScreen: string;

        public constructor() {
            super();
            egret.ExternalInterface.addCallback("activityBack", function (message: string) {
                console.log("message form native : " + message);//message form native : message from native
                console.log("currentScreen" + this.currentScreen);
                if (this.currentScreen == "loadingScreen" && this.currentScreen != undefined) {
                    this.enterLobbyScreen();
                } else if (this.currentScreen == "gameScreen") {

                }
                else {
                    egret.ExternalInterface.call("closeActivity", "message from js");
                }
            }.bind(this));
        }

        public enterLobbyScreen() {
            console.warn("进入大厅");
            this.currentScreen = "lobbyScreen";
            this.removeChildren();
            this.addChild(this.lobbyScreen);

        }

        public enterLoadingScreen() {
            console.warn("进入等待页面");
            this.currentScreen = "loadingScreen";
            this.removeChildren();
            this.addChild(this.loadingScreen);
        }

        public enterGameScreen() {
            console.warn("进入游戏");
            this.currentScreen = "gameScreen";
            this.removeChildren();
            this.addChild(this.gameScreen);
        }

        public showSettingWindow(data: any) {

        }

        public showEndWindow() {

        }

    }
}