
module game {

    export class AppContainer extends egret.Sprite {
        public lobbyScreen: LobbyScreen = new LobbyScreen();
        public gameScreen: GameScreen = new GameScreen();

        public constructor() {
            super();
        }

        public enterLobbyScreen(){
            console.warn("进入大厅");
            this.removeChildren();
            this.addChild(this.lobbyScreen);
        }

        public enterGameScreen(){
            this.removeChildren();
            this.addChild(this.gameScreen);
        }

        public showSettingWindow(data: any){

        }

        public showEndWindow(){

        }

    }
}