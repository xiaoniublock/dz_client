module game {

    export class LoadAndLoginScreen extends eui.Component {

        public lable_progress: eui.Label;
        public load_progress: eui.ProgressBar;
        public group_login: eui.Group;
        public group_normal: eui.Group;


        public btn_accountLogin: eui.Button;
        public btn_register: eui.Button;
        public btn_next: eui.Button;
        public btn_complete: eui.Button;
        public btn_login: eui.Button;

        public et_phone: eui.EditableText;
        public et_password: eui.EditableText;
        public et_sms: eui.EditableText;


        public btn_close: eui.Image;
        public btn_forget: eui.Image;

        public btnShow: egret.tween.TweenGroup;
        public currentX: number;

        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
        }

        public createCompleteEvent() {
            this.skinName = "LoadUISkin";
            ApplicationFacade.getInstance().registerMediator(new LoadAndLoginMediator(this));
            egret.ExternalInterface.call("closeImgAndTxt", "message from js");
        }
        public setProgress(current: number, total: number): void {
            this.load_progress.value = Math.ceil(current / total * 100);
            this.lable_progress.text = this.load_progress.value + "%";
            this.lable_progress.x = this.currentX + Math.ceil(this.load_progress.width * (current / total));
        }
        public showEnterButton() {
            this.group_login.visible = true;
            this.btnShow.play(0);
            this.load_progress.visible = false;
            this.lable_progress.visible = false;
        }

    }
}