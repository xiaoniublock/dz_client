
module game{

    export class GameScreen extends eui.Component {

        public backBtn: eui.Button;
        public switchBtn:eui.Button;
        public first_Bet:egret.tween.TweenGroup;
        public giveUpBtn:eui.Button;
        public passBtn:eui.Button;
        public addChipBtn:eui.Button;
        
        public count_choose:egret.tween.TweenGroup;
        public three_choose:egret.tween.TweenGroup;
        public checkBox_giveUp:eui.CheckBox;
        public checkBox_autoPass:eui.CheckBox;
        public checkBox_followAny:eui.CheckBox;
        public RangeMoneySlider:eui.VSlider;
        public RangeMoneyBtn:eui.Button;

        public userArray:Array<User>;
        public userNameArray:Array<string>;
        public userMoneyArray:Array<string>;

        public publicCardsGroup:eui.Group;
        public userCardsGroup:eui.Group;
        
        public MoneyBtnSmallest: eui.Button;
        public MoneyBtnSmall:eui.Button;
        public MoneyBtnNormal:eui.Button;
        public MoneyBtnBig:eui.Button;
        public MoneyBtnBiggest:eui.Button;


        public multipleBtn1:eui.Button;
        public multipleBtn2:eui.Button;
        public multipleBtn3:eui.Button;

        
         public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
            this.once(egret.Event.ADDED_TO_STAGE, this.beginAnimation, this);
        }

        private sendCardToUserTimer:egret.Timer;
        public beginAnimation(){
            this.sendCardToUserTimer = new egret.Timer(300,14);
            this.sendCardToUserTimer.addEventListener(egret.TimerEvent.TIMER,sendCardToUserTimer,this);
            this.sendCardToUserTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,sendCardToUserTimerOver,this);
            this.sendCardToUserTimer.start();

            function sendCardToUserTimer()
            {
                var index:number = this.sendCardToUserTimer.currentCount;
                var x:number = this["User_"+(index%7+1)].x + 102 + 104; //一个是group的位置偏移，一个是user位置偏移
                var y:number = this["User_"+(index%7+1)].y + 47 + 64;
                if(this.userNameArray[index%7] != ""){  //如果这个位置有人
                    this.cardAnimationWithOrigin(x,y,this.sendCardFinish,[index]);
                }
            }

            function sendCardToUserTimerOver()
            {	
                //游戏开始
            }
        }

        public cardAnimationWithOrigin(x:number,y:number,finishAnimationFunction:Function,params?:any[]){
            var card:eui.Image = new eui.Image();
            card.texture = RES.getRes("gamescreen.poker_right");
            card.x = 652;
            card.y = 187;
            this.addChild(card);
            var tween:egret.Tween = egret.Tween.get(card);
            tween.to({x : x,y : y,scale:0.5,alpha:0.5},300,egret.Ease.sineOut);
            params.push(card);
            tween.call(finishAnimationFunction,this,params);
        }

        public sendCardFinish(index : number,card : eui.Image){
            this.removeChild(card);
            this["User_"+(index%7+1)].cardNum = Math.ceil(index/7);
        }

        public createCompleteEvent(){
            this.skinName= this.skinName = "skins.GameSkin";
            this.switchBtn=new eui.Button();
            this.switchBtn.label = "切换你";
            this.switchBtn.left = 0;
            this.switchBtn.verticalCenter = 0;
            this.addChild(this.switchBtn);

            //测试用
            this.userNameArray = ["xiaoniao","shaniao","erniao","siniao","douniao","xiaoji","shaji"];
            this.userMoneyArray = ["3000","7000","100","2500","5000","500","200"];
            for(var i = 0;i < 7;i++){
                this["User_"+(i+1)].userName = this.userNameArray[i];
                this["User_"+(i+1)].goldNum = this.userMoneyArray[i];
                this["Chip_"+(i+1)].chipNum = this.userMoneyArray[i];
                this["Chip_"+(i+1)].isRight = !(i == 1 || i == 2 || i == 3);
                this["User_"+(i+1)]._isCardVisible = (i == 0);
                this["Chip_"+(i+1)].gotoBaseAnimation(this["baseChipNum"]);
            }
            
            this.RangeMoneySlider["change"].mask = new egret.Rectangle(0,0,0,0);
            this.RangeMoneySlider.addEventListener(egret.Event.CHANGE,this.onVSLiderChange,this);
            
            ApplicationFacade.getInstance().registerMediator(new GameMediator(this));
        }

        public sendCard(card : Card,card1 : eui.Image){
            this.removeChild(card1);
            card.visible=true;
            card.startrotateAndChangeSource();
        }

        /**
         * 发公共牌，有三个回合，第一回合发三张，后面两回合每次发一张
         */
        public sendPublicCard(round:number, cards:Array<Card>){
            switch(round){
                case 1:{
                     for(var i=0 ;i<3;i++){
                        let card=(<Card>this.publicCardsGroup.getChildAt(i));
                        card.index=cards[i].index;
                        card.color=cards[i].color;
                        this.cardAnimationWithOrigin(this.publicCardsGroup.x+card.x,this.publicCardsGroup.y+card.y,this.sendCard,[card]);
                        }
                    break;
                }
                case 2:
                case 3:{
                        let card=(<Card>this.publicCardsGroup.getChildAt(round+1));
                        card.index=cards[0].index;
                        card.color=cards[0].color;
                        this.cardAnimationWithOrigin(this.publicCardsGroup.x+card.x,this.publicCardsGroup.y+card.y,this.sendCard,[card]);
                    break;
                }
                
            }
            
        }
        /**
         * 发玩家的手牌，一次发两张
         */
        public sendOwnCard(cards:Array<Card>){
            for(var i=0 ;i<this.userCardsGroup.numChildren;i++){
                let card=(<Card>this.userCardsGroup.getChildAt(i));
                card.index=cards[i].index;
                card.color=cards[i].color;
                this.cardAnimationWithOrigin(this.userCardsGroup.x+card.x,this.userCardsGroup.y+card.y,this.sendCard,[card]);
            }
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
            // if(this.RangeMoneySlider.visible){    //不判断会崩
            //     this.RangeMoneySlider.visible = false;
            // }
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
    }
}