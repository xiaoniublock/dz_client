
module game{

    export class GameScreen extends eui.Component {

        public backBtn: eui.Button;
        public switchBtn:eui.Button;
        public first_Bet:egret.tween.TweenGroup;
        public count_choose:egret.tween.TweenGroup;
        public three_choose:egret.tween.TweenGroup;
        public checkBox_giveUp:eui.CheckBox;
        public RangeMoneySlider:eui.VSlider;

        public userArray:Array<User>;
        public userNameArray:Array<string>;
        public userMoneyArray:Array<string>;

         public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.initParameter, this);
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
        }
        
        public initParameter(){
            this.userNameArray = ["xiaoniao","shaniao","erniao","siniao","douniao","xiaoji","shaji"];
            this.userMoneyArray = ["468","468","227","47","47","227","468"];
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
                // var user = new User(this.userNameArray[i],this.userMoneyArray[i]);
                // user.x = this.userLocationXArray[i];
                // user.y = this.userLocationYArray[i];
                // user.width = 126;
                // user.height = 174;
                // this.addChild(user);
            }

            this.RangeMoneySlider["change"].mask = new egret.Rectangle(0,0,0,0);
            this.RangeMoneySlider.addEventListener(egret.Event.CHANGE,this.onVSLiderChange,this);

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
        }
    }
}