
module game {
    export class LobbyScreen extends eui.Component {

        public btn_start: eui.Button;
        public btn_match: eui.Button;
        public btn_game: eui.Button;

        public image_icon: eui.Image;
        public text_username: eui.Label;
        public image_gold: eui.Image;
        public text_count: eui.Label;
        public image_plus: eui.Image;

        public btn_activity: eui.Button;
        public btn_emailBox: eui.Button;
        public btn_rank: eui.Button;
        public btn_setting: eui.Button;

        public btn_shop: eui.Image;
        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
        }

        public createCompleteEvent() {
            this.skinName = "skins.LobbySkin";
            ApplicationFacade.getInstance().registerMediator(new LobbyMediator(this));
        }

    }
}