
module game{
    export class LobbyScreen extends egret.DisplayObjectContainer {

        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
        }

        public createCompleteEvent(){
            let sky = this.createBitmapByName("bg_jpg");
            this.addChild(sky);
            let stageW = this.stage.stageWidth;
            let stageH = this.stage.stageHeight;
            sky.width = stageW;
            sky.height = stageH;
        }

        private createBitmapByName(name: string): egret.Bitmap {
            let result = new egret.Bitmap();
            let texture: egret.Texture = RES.getRes(name);
            result.texture = texture;
            return result;
        }

    }
}