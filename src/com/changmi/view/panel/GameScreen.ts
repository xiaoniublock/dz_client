
module game {

    export class GameScreen extends eui.Component {

        public backBtn: eui.Button;
        public switchBtn: eui.Button;
        public first_Bet: egret.tween.TweenGroup;
        public giveUpBtn: eui.Button;
        public passBtn: eui.Button;
        public addChipBtn: eui.Button;

        public count_choose: egret.tween.TweenGroup;
        public three_choose: egret.tween.TweenGroup;
        public checkBox_giveUp: eui.CheckBox;
        public checkBox_autoPass: eui.CheckBox;
        public checkBox_followAny: eui.CheckBox;
        public RangeMoneySlider: eui.VSlider;
        public RangeMoneyBtn: eui.Button;

        public users: Array<User>;
        public chips: Array<Chip>;

        public publicCardsGroup: eui.Group;
        public userCardsGroup: eui.Group;
        public UserGroup: eui.Group;

        public MoneyBtnSmallest: eui.Button;
        public MoneyBtnSmall: eui.Button;
        public MoneyBtnNormal: eui.Button;
        public MoneyBtnBig: eui.Button;
        public MoneyBtnBiggest: eui.Button;


        public multipleBtn1: eui.Button;
        public multipleBtn2: eui.Button;
        public multipleBtn3: eui.Button;


        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
            this.once(egret.Event.ADDED_TO_STAGE, this.initialize, this)
            // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.beginAnimation, this);
        }
        private initialize() {
            ApplicationFacade.getInstance().registerMediator(new GameMediator(this));
        }

        private sendCardToUserTimer: egret.Timer;
        public beginAnimation() {
            var userCount = UserUtils.getInstance().getUsers().length;
            this.sendCardToUserTimer = new egret.Timer(300, 2 * userCount);
            this.sendCardToUserTimer.addEventListener(egret.TimerEvent.TIMER, sendCardToUserTimer, this);
            this.sendCardToUserTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, sendCardToUserTimerOver, this);
            this.sendCardToUserTimer.start();

            function sendCardToUserTimer() {
                var index: number = this.sendCardToUserTimer.currentCount;
                var userCount: number = this.sendCardToUserTimer.repeatCount / 2;
                if(index == this.sendCardToUserTimer.repeatCount){
                    return;
                }
                if (UserUtils.getInstance().getUserFromIndex(index % userCount).seat == 4) {
                    this.sendOwnCard(index/userCount,UserUtils.getInstance().getOwnUser().cards.cards[parseInt(""+index/userCount)]);
                    return;
                }
                var userSeat:number = UserUtils.getInstance().getUserFromIndex(index % userCount).seat - 1;
                var x: number = this.users[userSeat].x + 102 + 104; //一个是group的位置偏移，一个是user位置偏移
                var y: number = this.users[userSeat].y + 47 + 64;
                if (this.users[userSeat].visible) {  //如果这个位置有人
                    this.cardAnimationWithOrigin(x, y, this.sendCardFinish, [userSeat]);
                }
            }

            function sendCardToUserTimerOver() {
                //游戏开始
                //this.sendPublicCard(1, CardUtils.getInstance().getPublicCards);
            }
        }

        public sendCardFinish(index: number, card: eui.Image) {
            this.removeChild(card);
            this.users[index].cardNum++;
        }

        //刷新页面
        public createCompleteEvent() {
            this.skinName = "skins.GameSkin";
            this.switchBtn = new eui.Button();
            this.switchBtn.label = "切换你";
            this.switchBtn.left = 0;
            this.switchBtn.verticalCenter = 0;
            this.addChild(this.switchBtn);

            //测试用
            this.users = [this["User_1"], this["User_2"], this["User_3"], this["User_4"], this["User_5"], this["User_6"], this["User_7"]];
            this.chips = [this["Chip_1"], this["Chip_2"], this["Chip_3"], this["Chip_4"], this["Chip_5"], this["Chip_6"], this["Chip_7"]];
            var userpool: Array<User> = UserUtils.getInstance().getUsers();
            var readyId: string = CachePool.getObj("ready");
            for (var i = 0; i < userpool.length; i++) {
                var user: User = userpool[i];
                this.addOneUserAction(user);
                if (user.uId == readyId) {
                    this.users[user.seat - 1].startrotate(CachePool.getObj("time"));
                }
            }
            for (var i = 0; i < CardUtils.getInstance().getPublicCards().length; i++) {
                let card: Card = <Card>this.publicCardsGroup.getChildAt(i);
                card.createCardSource(CardUtils.getInstance().getPublicCard(i).index, CardUtils.getInstance().getPublicCard(i).color)
                card.visible = true;
            }
            let card1: Card = new Card(5, 2);
            let card2: Card = new Card(5, 3);
            let cardGroup: Array<Card> = [];
            cardGroup.push(card1);
            cardGroup.push(card2);
            // this.showPlayerCards("10089", cardGroup);
            this["baseChipNum"].text = CachePool.getObj("jackpot");
            this.RangeMoneySlider["change"].mask = new egret.Rectangle(0, 0, 0, 0);
            this.RangeMoneySlider.addEventListener(egret.Event.CHANGE, this.onVSLiderChange, this);

            // this.sendPublicCard(1, CardUtils.getInstance().getPublicCards());
        }

        public sendCard(card: Card, card1: eui.Image) {
            this.removeChild(card1);
            card.visible = true;
            card.startrotateAndChangeSource();
        }

        /**
         * 增加单人方法
         */
        public addOneUserAction(user: User) {
            var index = user.seat - 1;
            this.users[index].name = user.name;
            this.users[index].money = user.money;
            this.users[index].cardNum = 0;
            this.users[index].angle = 1000;
            this.users[index].visible = true;
            this.chips[index].chipNum = user.stake;
            this.chips[index].isRight = (index == 0 || index == 1 || index == 2);
            this.users[index].isCardVisible = (index == 3);
        }

        /**
         * 删除单人方法
         */
        public removeOneUserAction(index: number) {
            this.users[index].visible = false;
        }

        /**
         * 发公共牌，有三个回合，第一回合发三张，后面两回合每次发一张
         */
        public sendPublicCard(round: number, cards: Array<Card>) {
            switch (round) {
                case 1: {
                    for (var i = 0; i < 3; i++) {
                        let card = (<Card>this.publicCardsGroup.getChildAt(i));
                        card.index = cards[i].index;
                        card.color = cards[i].color;
                        egret.setTimeout(function (card: Card) {
                            this.cardAnimationWithOrigin(this.publicCardsGroup.x + card.x, this.publicCardsGroup.y + card.y, this.sendCard, [card]);
                        }, this, i * 300, card);
                    }
                    break;
                }
                case 2:
                case 3: {
                    let card = (<Card>this.publicCardsGroup.getChildAt(round + 1));
                    card.index = cards[0].index;
                    card.color = cards[0].color;
                    this.cardAnimationWithOrigin(this.publicCardsGroup.x + card.x, this.publicCardsGroup.y + card.y, this.sendCard, [card]);
                    break;
                }

            }

        }
        /**
         * 发玩家的手牌
         */
        public sendOwnCard(index: number, data: Card) {
            let card = (<Card>this.userCardsGroup.getChildAt(index));
            card.index = data.index;
            card.color = data.color;
            this.cardAnimationWithOrigin(this.userCardsGroup.x + card.x, this.userCardsGroup.y + card.y, this.sendCard, [card]);
        }

        /**
         * 显示手牌
         */
        public showPlayerCards(uid: string, cardGroup: Array<Card>) {
            let user: User = UserUtils.getInstance().getUserFromUid(uid);
            this.users[user.seat - 1].playerCardGroup.visible = true;
            for (let i = 0; i < this.users[user.seat - 1].playerCardGroup.numChildren; i++) {
                let card: Card = <Card>this.users[user.seat - 1].playerCardGroup.getChildAt(i);
                card.createCardSource(cardGroup[i].index, cardGroup[i].color);
            }
        }

        public switchBottomState(state: String) {
            if (state == "first_Bet") {
                this.first_Bet.play(0);
            }
            if (state == "count_choose") {
                this.count_choose.play(0);
            }
            if (state == "three_choose") {
                this.three_choose.play(0);
            }
            this.skin.currentState = state + "";

            console.log(state);
        }

        private onVSLiderChange(e: egret.Event) {
            var scale = this.RangeMoneySlider.pendingValue / this.RangeMoneySlider.maximum;
            this.RangeMoneySlider["change"].mask = new egret.Rectangle(0,
                30 + (1 - scale) * this.RangeMoneySlider.height * 0.82,
                26,
                scale * this.RangeMoneySlider.height * 0.82);
            this.RangeMoneyBtn.label = "" + this.RangeMoneySlider.pendingValue;
        }

        //下面都是动画效果

        //通用发牌效果
        public cardAnimationWithOrigin(x: number, y: number, finishAnimationFunction: Function, params?: any[]) {
            var card: eui.Image = new eui.Image();
            card.texture = RES.getRes("gamescreen.poker_right");
            card.x = 652;
            card.y = 187;
            this.addChild(card);
            var tween: egret.Tween = egret.Tween.get(card);
            tween.to({ x: x, y: y, scale: 0.5, alpha: 0.5 }, 300, egret.Ease.sineOut);
            params.push(card);
            tween.call(finishAnimationFunction, this, params);
        }

        //通用加注效果
        public addChipAnimation(chip: number, userPosition: number) {
            var chipImg: eui.Image = new eui.Image();
            chipImg.x = this.users[userPosition - 1].x + 50;
            chipImg.y = this.users[userPosition - 1].y + 140;
            this.UserGroup.addChild(chipImg);

            if (chip <= 300) {
                chipImg.texture = RES.getRes("gamescreen.chip_50-300");
            } else if (chip <= 1000) {
                chipImg.texture = RES.getRes("gamescreen.chip_300-1000");
            } else if (chip <= 2500) {
                chipImg.texture = RES.getRes("gamescreen.chip_1000-2500");
            } else if (chip <= 5000) {
                chipImg.texture = RES.getRes("gamescreen.chip_2500-5000");
            } else {
                chipImg.texture = RES.getRes("gamescreen.chip_5000_more");
            }

            this.users[userPosition - 1].money -= chip;
            var tween: egret.Tween = egret.Tween.get(chipImg);
            tween.to({ x: this.chips[userPosition - 1].x + 40, y: this.chips[userPosition - 1].y, scale: 0.5, alpha: 0.5 }, 400, egret.Ease.sineOut);
            tween.call(function () {
                this.chips[userPosition - 1].chipNum += chip;
                this.UserGroup.removeChild(chipImg);
            }, this);
        }

        //给钱动画——未完成
        public giveChipAction(chip: number, userPosition: number) {
            var chipNumArray: Array<number> = [10000, 2500, 1000, 300, 50];
            var chipNameArray: Array<string> = ["gamescreen.chip_5000_more", "gamescreen.chip_2500-5000",
                "gamescreen.chip_1000-2500", "gamescreen.chip_300-1000", "gamescreen.chip_50-300"];
            var chipArray: Array<string> = new Array();
            var chipNow: number = 0;         //记录当前计算的筹码
            for (var i = 0; i < chipNumArray.length; i++) {
                while (chipNow + chipNumArray[i] < chip) {
                    chipNow += chipNumArray[i];
                    chipArray.push(chipNameArray[i]);
                }
            }

            var timer = new egret.Timer(100, chipArray.length);
            timer.addEventListener(egret.TimerEvent.TIMER, giveChip, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, timerComplete, this);
            timer.start();

            AnimationUtils.getInstance().changeLabelNumber(this["baseChipNum"], -chip);
            this.users[userPosition - 1].addChip(chip);

            function giveChip() {
                this.giveChipAnimation(this.users[userPosition - 1].x, this.users[userPosition - 1].y, chipArray[timer.currentCount]);
            }

            function timerComplete() {
                timer.removeEventListener(egret.TimerEvent.TIMER, giveChip, this);
                timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, timerComplete, this);
            }
        }

        public giveChipAnimation(x: number, y: number, type: string) {
            var chipImg: eui.Image = new eui.Image();
            chipImg.texture = RES.getRes(type);
            chipImg.x = this["baseChipNum"].x;
            chipImg.y = this["baseChipNum"].y;
            this.UserGroup.addChild(chipImg);

            var tween: egret.Tween = egret.Tween.get(chipImg);
            tween.to({ x: x + 50, y: y + 140, scale: 0.5, alpha: 0.5 }, 400, egret.Ease.sineOut);
            tween.call(function () {
                this.UserGroup.removeChild(chipImg);
            }, this);
        }
    }
}