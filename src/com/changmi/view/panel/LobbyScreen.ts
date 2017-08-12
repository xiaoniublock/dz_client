
module game{
    export class LobbyScreen extends eui.Component {

        public startBtn: eui.Button;

        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
        }

        public createCompleteEvent(){
            this.skinName = "skins.LobbySkin";
            ApplicationFacade.getInstance().registerMediator(new LobbyMediator(this));
        }

    }
}