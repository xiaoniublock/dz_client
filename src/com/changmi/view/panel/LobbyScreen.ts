
module game {
    export class LobbyScreen extends eui.Component {

        public btn_start: eui.Button;
        public btn_match: eui.Button;
        public btn_game: eui.Button;
        public btn_friendsGame: eui.Button;

        public image_icon: eui.Image;
        public text_username: eui.Label;


        public text_diamonds_count: eui.Label;
        public text_gold_count: eui.Label;

        public btn_diamonds_plus: eui.Button;
        public btn_gold_plus: eui.Button;

        public btn_close: eui.Button;

        public btn_activity: eui.Button;
        public btn_emailBox: eui.Button;
        public btn_rank: eui.Button;
        public btn_friends: eui.Button;
        public btn_setting: eui.Button;

        public btn_shop: eui.Image;

        public recharge: egret.tween.TweenGroup;

        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
            this.once(egret.Event.ADDED_TO_STAGE, this.resetUser, this);
            this.once(eui.UIEvent.COMPLETE, this.createView, this);
        }
        public childrenCreated() {
            super.childrenCreated();
            this.left = 0;
            this.right = 0;
            this.top = 0;
            this.bottom = 0;
        }

        public createCompleteEvent() {
            this.skinName = "skins.LobbySkin";
            ApplicationFacade.getInstance().registerMediator(new LobbyMediator(this));

        }

        public resetUser() {
            this.text_username.text = UserUtils.getInstance().getOwnUser().name;
            this.text_gold_count.text = "" + UserUtils.getInstance().getOwnUser().money;
        }

        private createView(): void {
            var distance: number = 2;           /// 阴影的偏移距离，以像素为单位
            var angle: number = 45;              /// 阴影的角度，0 到 360 度
            var color: number = 0x000000;        /// 阴影的颜色，不包含透明度
            var alpha: number = 0.7;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
            var blurX: number = 16;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
            var blurY: number = 16;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
            var strength: number = 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
            var quality: number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，暂无实现
            var inner: boolean = false;            /// 指定发光是否为内侧发光
            var knockout: boolean = false;            /// 指定对象是否具有挖空效果
            var dropShadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY,
                strength, quality, inner, knockout);
            this.image_icon.filters = [dropShadowFilter];

            var circle: egret.Shape = new egret.Shape();
            circle.graphics.beginFill(0x00ff00);
            circle.graphics.drawCircle(this.image_icon.left + 75, this.stage.stageHeight - this.image_icon.bottom - 75, 75);
            circle.graphics.endFill();
            // this.addChild(circle);
            this.image_icon.mask = circle;
            this.addChild(circle);

        }

    }
}