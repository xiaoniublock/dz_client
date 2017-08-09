
module game{
    export class LobbyScreen extends egret.DisplayObjectContainer {

        public sky: egret.Bitmap;
        public startBtn: eui.Button;

        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
        }

        public createCompleteEvent(){
            this.sky = this.createBitmapByName("bg_jpg");
            this.addChild(this.sky);
            let stageW = this.stage.stageWidth;
            let stageH = this.stage.stageHeight;
            this.sky.width = stageW;
            this.sky.height = stageH;

            this.startBtn = new eui.Button();
            this.startBtn.label = "开始游戏";
            this.startBtn.horizontalCenter = 0;
            this.startBtn.verticalCenter = 0;
            this.addChild(this.startBtn);

            ApplicationFacade.getInstance().registerMediator(new LobbyMediator(this));
        }

        private createBitmapByName(name: string): egret.Bitmap {
            let result = new egret.Bitmap();
            let texture: egret.Texture = RES.getRes(name);
            result.texture = texture;
            return result;
        }

    }
}