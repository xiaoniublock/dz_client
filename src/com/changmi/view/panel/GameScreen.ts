
module game{

    export class GameScreen extends eui.Component {

        public backBtn: eui.Button;
        public switchBtn:eui.Button;
        public first_Bet:egret.tween.TweenGroup;
        public count_choose:egret.tween.TweenGroup;
        public three_choose:egret.tween.TweenGroup;
        public checkBox_giveUp:eui.CheckBox;
        public RangeMoneySlider:eui.VSlider;
        public RangeMoneyBtn:eui.Button;

        public userArray:Array<User>;
        public userNameArray:Array<string>;
        public userMoneyArray:Array<string>;
        public baseChip:number;

         public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.initParameter, this);
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
        }
        
        public initParameter(){
            this.baseChip = 0;
            this.userNameArray = ["xiaoniao","shaniao","erniao","siniao","douniao","xiaoji","shaji"];
            this.userMoneyArray = ["3000","7000","100","2500","5000","500","200"];
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

            for(var i = 0;i < 7;i++){
                this["User_"+(i+1)].userName = this.userNameArray[i];
                this["User_"+(i+1)].goldNum = this.userMoneyArray[i];
                this["Chip_"+(i+1)].chipNum = this.userMoneyArray[i];
                this["Chip_"+(i+1)].isRight = !(i == 1 || i == 2 || i == 3);
                this.gotoBaseAnimation(this["Chip_"+(i+1)]);
            }

            this.RangeMoneySlider["change"].mask = new egret.Rectangle(0,0,0,0);
            this.RangeMoneySlider.addEventListener(egret.Event.CHANGE,this.onVSLiderChange,this);

            this.RangeMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapRangeMoney,this);

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
            if(this.RangeMoneySlider.visible){    //不判断会崩
                this.RangeMoneySlider.visible = false;
            }
            this.skin.currentState=state+"";
            console.log(state);
        }
        
        private onVSLiderChange(e:egret.Event) {
            var scale = this.RangeMoneySlider.pendingValue / this.RangeMoneySlider.maximum;
            this.RangeMoneySlider["change"].mask = new egret.Rectangle(0,
            30 + (1 - scale) * this.RangeMoneySlider.height * 0.82,
            26,
            scale * this.RangeMoneySlider.height * 0.82);
            this.RangeMoneyBtn.label = "" + this.RangeMoneySlider.pendingValue;
        }

        private tapRangeMoney(e:egret.Event){
            if(this.RangeMoneySlider.visible){    //不判断会崩
                this.RangeMoneySlider.visible = false;
            }else{
                this.RangeMoneySlider.visible = true;
            }
        }

        private gotoBaseAnimation(chip:Chip){
		    var x:number = chip.x;
		    var y:number = chip.y;
		    var tween:egret.Tween = egret.Tween.get(chip);
            tween.to({alpha : 0.4,x : this["baseChipNum"].x,y : this["baseChipNum"].y},1000,egret.Ease.sineOut);
		    tween.call(function(){
			    chip.visible = false;
			    chip.x = x;
			    chip.y = y;
			    chip.alpha = 1;
                this.baseChip += parseInt("" + chip.chipNum);
                chip.chipNum = 0;
                this["baseChipNum"].text = "" + this.baseChip;
		    },this);
	    }
    }
}