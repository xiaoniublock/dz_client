
module game{

    export class GameScreen extends eui.Component {

        public backBtn: eui.Button;
        public switchBtn:eui.Button;
        public first_Bet:egret.tween.TweenGroup;
        public count_choose:egret.tween.TweenGroup;
        public three_choose:egret.tween.TweenGroup;
        public checkBox_giveUp:eui.CheckBox;
        public vslide:eui.VSlider;
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
            this.switchBtn=new eui.Button();
            this.switchBtn.label = "切换你";
            this.switchBtn.left = 0;
            this.switchBtn.verticalCenter = 0;
            this.addChild(this.switchBtn);
            
            this.vslide = new eui.VSlider;
            this.vslide.skinName = "skins.RangeMoneySkin";
            this.vslide.verticalCenter = 0;
            this.vslide.horizontalCenter = 500;
		    ///通过 minimum 属性设置最小值。
            this.vslide.minimum = 0;
		    ///通过 maximum 属性设置最大值。
            this.vslide.maximum = 2000;
		    ///通过 snapInterval 属性设置增加的有效值。
            this.vslide.snapInterval = 100;
            this.vslide.pendingValue = 500;
            ///监听 CHANGE 事件
            this.vslide.addEventListener(egret.Event.CHANGE,this.onVSLiderChange,this);
            this.addChild(this.vslide);

            ApplicationFacade.getInstance().registerMediator(new GameMediator(this));
        }

        public switchBottomState(state:String){
            if(state=="first_Bet"){
                this.first_Bet.play(0);
            }
              if(state=="count_choose"){
                this.count_choose.play(0);

            }
              if(state=="three_choose"){
                this.three_choose.play(0);
            }
           
            this.skin.currentState=state+"";
            console.log(state);
        }
        
        private onVSLiderChange(e:egret.Event) {
            var scale = this.vslide.pendingValue / this.vslide.maximum;
            // this.vslide["change"].height = scale * this.vslide.height * 0.82;
            // this.vslide["change"].y = 30 + (1 - scale) * this.vslide.height * 0.82;
            this.vslide["change"].mask = new egret.Rectangle(0,
                                                             30 + (1 - scale) * this.vslide.height * 0.82,
                                                             26,
                                                             scale * this.vslide.height * 0.82);
        }
    }
}