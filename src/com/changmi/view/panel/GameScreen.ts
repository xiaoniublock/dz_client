
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
        public UserGroup:eui.Group;
        
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
                if(index==2){
                  this["User_"+index].playerOut();
                }
                if((index==3||index==10)){
                    // this.sendOwnCard(index/7,UserUtils.getInstance().getOwnUser().cards.cards[index/7]);
                   this.sendOwnCard(index/7,new Card(8,3));
                    return;
                }
                var x:number = this["User_"+(index%7+1)].x + 102 + 104; //一个是group的位置偏移，一个是user位置偏移
                var y:number = this["User_"+(index%7+1)].y + 47 + 64;
                if(this.userNameArray[index%7] != ""){  //如果这个位置有人
                    this.cardAnimationWithOrigin(x,y,this.sendCardFinish,[index]);
                }
            }

            function sendCardToUserTimerOver()
            {	
                //游戏开始
                let cards:Array<Card>=[];
                cards.push(new Card(10,1));
                cards.push(new Card(11,1));
                cards.push(new Card(12,1));
                this.sendPublicCard(1,cards);
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
                this["User_"+(i+1)].isCardVisible = (i == 3);
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
                        egret.setTimeout(function(card:Card){
                        this.cardAnimationWithOrigin(this.publicCardsGroup.x+card.x,this.publicCardsGroup.y+card.y,this.sendCard,[card]);
                     },this,i*300,card);
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
         * 发玩家的手牌
         */
        public sendOwnCard(index:number,data:Card){
                let card=(<Card>this.userCardsGroup.getChildAt(index));
                card.index=data.index;
                card.color=data.color;
                this.cardAnimationWithOrigin(this.userCardsGroup.x+card.x,this.userCardsGroup.y+card.y,this.sendCard,[card]);
        }
        /**
         * 显示手牌
         */
        public showPlayerCards(index:number,cardGroup:Array<Card>){
           let user:User= UserUtils.getInstance().getUserFromIndex(index);
           user.playerCardGroup.visible=true;
           for(let i=0;i<user.playerCardGroup.numChildren;i++){
               let card:Card=<Card>user.playerCardGroup.getChildAt(i);
              card.index=cardGroup[i].index;
              card.color=cardGroup[i].color;
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