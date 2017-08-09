
module game{
    export class LobbyScreen extends egret.DisplayObjectContainer {

        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
        }

        public createCompleteEvent(){
            
        }

    }
}