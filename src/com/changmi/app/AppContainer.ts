
module game {

    export class AppContainer extends egret.Sprite {
        public lobbyScreen: LobbyScreen = new LobbyScreen();
        //public gameScreen: GameScreen = new GameScreen();

        public constructor() {
            super();
        }

        public enterLobbyScreen(){
            console.warn("进入大厅");
            this.addChild(this.lobbyScreen);
        }

        public enterGameScreen(){

        }

        public showSettingWindow(data: any){

        }

        public showEndWindow(){

        }

    }
}