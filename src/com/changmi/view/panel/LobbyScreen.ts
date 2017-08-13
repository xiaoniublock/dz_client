
module game{
    export class LobbyScreen extends eui.Component {

        public btn_start:eui.Image;
        public btn_match:eui.Image;
        public btn_game:eui.Image;
        
        public image_icon:eui.Image;
        public text_username:eui.Label;
        public image_gold:eui.Image;
        public text_count:eui.Label;
        public image_plus:eui.Image;

        public btn_activity:eui.Image;
        public btn_emailBox:eui.Image;
        public btn_rank:eui.Image;
        public btn_setting:eui.Image;

        public btn_shop:eui.Image;
        public constructor() {
            super();
            //  this.skinName = "resource/game_skin/LobbyScreenSkin.exml";
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
        }

        public createCompleteEvent(){

           this.skinName = "skins.LobbySkin";
           this.width=this.stage.stageWidth;
           this.height=this.stage.stageHeight;
            // this.startBtn = new eui.Button();
            // this.startBtn.label = "开始游戏";
            // this.startBtn.right = 0;
            // this.startBtn.bottom = 0;
            // this.addChild(this.startBtn);
            // this.btn_start.touchEnabled=true;
           

            
            ApplicationFacade.getInstance().registerMediator(new LobbyMediator(this));
        }

    }
}