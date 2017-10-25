
module game {

    export class AppContainer extends eui.Component {
        public lobbyScreen: LobbyScreen = new LobbyScreen();
        public gameScreen: GameScreen = new GameScreen();
        public loadingScreen: LoadScreen = new LoadScreen();
        public loadAndLoadScreen: LoadAndLoginScreen = new LoadAndLoginScreen();
        public currentScreen: string;

        public constructor() {
            super();
        }
        public childrenCreated() {
            super.childrenCreated();
            this.left = 0;
            this.right = 0;
            this.top = 0;
            this.bottom = 0;
        }

        public enterLoadAndLoginScreen() {
            console.warn("进入加载登录页");
            this.currentScreen = "loadAndLoadScreen";
            this.removeChildren();
            this.addChild(this.loadAndLoadScreen);

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