
module game{

    export class GameScreen extends eui.Component {

        public backBtn: eui.Button;
        public switchBtn:eui.Button;
        public first_Bet:egret.tween.TweenGroup;
        public count_choose:egret.tween.TweenGroup;
        public three_choose:egret.tween.TweenGroup;
        public checkBox_giveUp:eui.CheckBox;
        public vslide:eui.VSlider;

        public userArray:Array<User>;
        public userLocationXArray:Array<number>;
        public userLocationYArray:Array<number>;
        public userNameArray:Array<string>;
        public userMoneyArray:Array<string>;

         public constructor() {
            super();
            //this.once(egret.Event.ADDED_TO_STAGE, this.initParameter, this);
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
        }
        
        public initParameter(){
            this.userLocationXArray = [604,262,102,262,942,1109,942];
            this.userLocationYArray = [468,468,227,47,47,227,468];
            this.userNameArray = ["xiaoniao","shaniao","erniao","siniao","douniao","xiaoji","shaji"];
            this.userMoneyArray = ["468","468","227","47","47","227","468"];
        }

        public createCompleteEvent(){
            this.skinName = "skins.GameSkin";
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

            for(var i = 1;i < 8;i++){
                // this["User_"+i] = new User(this.userNameArray[i],this.userMoneyArray[i-1]);
                // var user = new User(this.userNameArray[i],this.userMoneyArray[i]);
                // user.x = this.userLocationXArray[i];
                // user.y = this.userLocationYArray[i];
                // user.width = 126;
                // user.height = 174;
                // this.addChild(user);
            }

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
            this.vslide["change"].mask = new egret.Rectangle(0,0,0,0);
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
            if(this.vslide.visible){    //不判断会崩
                this.vslide.visible = false;
            }
            this.skin.currentState=state+"";
            console.log(state);
        }
        
        private onVSLiderChange(e:egret.Event) {
            var scale = this.vslide.pendingValue / this.vslide.maximum;
            this.vslide["change"].mask = new egret.Rectangle(0,
                                                             30 + (1 - scale) * this.vslide.height * 0.82,
                                                             26,
                                                             scale * this.vslide.height * 0.82);
        }
    }
}