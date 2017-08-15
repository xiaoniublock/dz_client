
module game{

    export class GameScreen extends eui.Component {

        public backBtn: eui.Button;

         public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
        }

        public createCompleteEvent(){
            this.skinName= this.skinName = "skins.GameSkin";
            this.backBtn = new eui.Button();
            this.backBtn.label = "返回";
            this.backBtn.horizontalCenter = 0;
            this.backBtn.verticalCenter = 0;
            this.addChild(this.backBtn);

            // console.warn(this.stage.stageWidth);

            ApplicationFacade.getInstance().registerMediator(new GameMediator(this));
        }

        public switchBottomState(){
            
        }

    }
}