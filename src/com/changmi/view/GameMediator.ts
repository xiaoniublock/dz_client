module game {

    export class GameMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "GameScreenMediator";
        public num = 0;
        public constructor(viewComponent: any) {
            super(GameMediator.NAME, viewComponent);
            this.gameScreen.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backButtonClick, this);
            this.gameScreen.switchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchButtonClick, this);
            this.gameScreen.checkBox_giveUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
            this.gameScreen.checkBox_autoPass.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
            this.gameScreen.checkBox_followAny.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);

            this.gameScreen.giveUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giveupAction, this);
            this.gameScreen.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.passAction, this);
            this.gameScreen.addChipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addChipAction, this);

            this.gameScreen.MoneyBtnSmallest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.countBetNum, this);
            this.gameScreen.MoneyBtnSmall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.countBetNum, this);
            this.gameScreen.MoneyBtnNormal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.countBetNum, this);
            this.gameScreen.MoneyBtnBig.addEventListener(egret.TouchEvent.TOUCH_TAP, this.countBetNum, this);
            this.gameScreen.MoneyBtnBiggest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.countBetNum, this);
            this.gameScreen.RangeMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.countBetNum, this);


            this.gameScreen.multipleBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.countBetMul, this);
            this.gameScreen.multipleBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.countBetMul, this);
            this.gameScreen.multipleBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.countBetMul, this);
            this.gameScreen.users[3].addEventListener(User.GIVEUP, function () {
                console.log("users[3]计时结束");

            }, this);


        }
        ///处理复选框的change事件回调
        private onChange(event: egret.TouchEvent) {
            ///获得当前复选框
            var checkBox: eui.CheckBox = <eui.CheckBox>event.target;

            switch (checkBox.name) { //强行单选化
                case "giveUpOrPass": {
                    this.gameScreen.checkBox_autoPass.selected = false;
                    this.gameScreen.checkBox_followAny.selected = false;
                    break;
                }
                case "autoPass": {
                    this.gameScreen.checkBox_giveUp.selected = false;
                    this.gameScreen.checkBox_followAny.selected = false;
                    break;
                }
                case "followAny": {
                    this.gameScreen.checkBox_giveUp.selected = false;
                    this.gameScreen.checkBox_autoPass.selected = false;
                    break;
                }
            }
            //记录下此时的CheckBox状态，待到轮到自己的时候再取出信息，根据信息判断下一步操作发送什么信息
            //  this.sendNotification(GameCommand.ACTION,event.currentTarget.name);



            if (checkBox.currentState === "disabled" || checkBox.currentState === "disabledAndSelected") {
                // label.text = "禁用状态，无法选择";
            } else {
                ///获得当前复选框的标签并显示出来
                console.log(checkBox.selected);
                ///取消显示设置复选框的状态，由内部的 getCurrentState() 决定。
                // checkBox.currentState = null;
            }

        }

        public backButtonClick(event: egret.TouchEvent) {
            console.warn("点击返回");
            this.sendNotification(LobbyCommand.CHANGE, 1);
            NetController.getInstance().close(NetController.GAMESOCKET);
        }
        public switchButtonClick(event: egret.TouchEvent) {
            let stats: Array<String> = ["first_Bet", "count_choose", "three_choose"];

            this.sendNotification(GameProxy.CHANGE_STATE, stats[this.num % 3]);
            this.num++;
        }
        public listNotificationInterests(): Array<any> {
            return [
                GameProxy.CHANGE_STATE,
                GameProxy.ADD_USER,
                GameProxy.REM_USER,
                GameProxy.ADD_CHIP,
                GameProxy.POP_CARD
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case GameProxy.CHANGE_STATE: {
                    this.gameScreen.switchBottomState(<String><any>data);
                    break;
                }
                case GameProxy.ADD_USER: {
                    this.gameScreen.addOneUserAction(<User><any>data);
                    break;
                }
                case GameProxy.REM_USER: {
                    this.gameScreen.removeOneUserAction(<number><any>data);
                    break;
                }
                case GameProxy.ADD_CHIP:
                case GameProxy.AllIN:
                    this.userAddChip(data.uid, data.raiseStack);
                case GameProxy.FOLD:
                    this.gameScreen.playerFold(data.uid, data.raiseStack);
                case GameProxy.CHECK:
                    {
                        this.gameScreen.changePlayer(data.uid, data.nextplayer);
                        if (data.nextplayer == UserUtils.getInstance().getOwnUser().uId) {
                            this.gameScreen.switchBottomState("first_Bet");
                            CachePool.addObj("stake", data.stake);
                            this.changeBtnState(data.operator, data.stake);
                        } else {
                            this.gameScreen.switchBottomState("three_choose");
                        }
                        break;
                    }
                case GameProxy.POP_CARD: {
                    this.userGetCards(data.holeCards);
                    break;
                }

            }
        }
        public get gameScreen(): GameScreen {
            return <GameScreen><any>(this.viewComponent);
        }

        public giveupAction(event: egret.TouchEvent) {
            this.gameScreen.giveChipAction(parseInt(this.gameScreen["baseChipNum"].text), 4);
            this.sendNotification(GameCommand.ACTION, Actions.giveup);
        }

        public passAction(event: egret.TouchEvent) {
            for (var i = 0; i < 7; i++) {
                if (this.gameScreen.chips[i].chipNum != 0) {
                    this.gameScreen.chips[i].gotoBaseAnimation(this.gameScreen["baseChipNum"]);
                }
            }
            this.sendNotification(GameCommand.ACTION, Actions.pass);
        }

        public addChipAction(event: egret.TouchEvent) {
            this.sendNotification(GameProxy.CHANGE_STATE, "count_choose");
        }

        public countBetNum(event: egret.TouchEvent) {
            var data: BaseMsg = new BaseMsg();
            data.command = Commands.PLAYERBET;
            data.content = { "action":1, "uId": UserUtils.getInstance().getOwnUser().uId, "tId": "1" , "raiseStack":parseInt(event.currentTarget.label)};
            NetController.getInstance().sendData(NetController.GAMESOCKET,data);

            // this.gameScreen.addChipAnimation(parseInt(event.currentTarget.label), 4);
            // this.sendNotification(GameCommand.ACTION, event.currentTarget.label);

        }

        public countBetMul(event: egret.TouchEvent) {
            console.log(<eui.Button>event.currentTarget.label);
        }

        public userAddChip(uId: string, chip: number) {
            var seat: number = UserUtils.getInstance().getUserFromUid(uId).seat;
            this.gameScreen.addChipAnimation(chip, seat);
        }
        public userGetCards(cards: Array<number>) {
            UserUtils.getInstance().getOwnUser().initcards(cards);
            this.gameScreen.beginAnimation();
        }
        public changeBtnState(operator: number, stake: number) {
            switch (operator) {
                case StateCode.FOLLOWBET:
                    this.gameScreen.passBtn.alpha = 1;
                    this.gameScreen.passBtn.touchEnabled = true;
                    this.gameScreen.passBtn.label = "跟 注";
                    this.gameScreen.addChipBtn.label = "加 注";
                    break;
                case StateCode.PASSBET:
                    this.gameScreen.passBtn.alpha = 1;
                    this.gameScreen.passBtn.touchEnabled = true;
                    this.gameScreen.passBtn.label = "让 牌";
                    this.gameScreen.addChipBtn.label = "加 注";
                    break;
                case StateCode.JUSTALLIN:
                    this.gameScreen.passBtn.alpha = 0.5;
                    this.gameScreen.passBtn.touchEnabled = false;
                    this.gameScreen.addChipBtn.label = "全 下";
                    break;
            }
            if (operator == StateCode.JUSTALLIN)
                return;
            for (let i = 0; i < this.gameScreen.count_group.numChildren - 2; i++) {
                let money: eui.Button = <eui.Button>this.gameScreen.count_group.getChildAt(i);
                parseInt(money.label) > stake ? (money.alpha = 1, money.touchEnabled = true) : (money.alpha = 0.5, money.touchEnabled = false);
            }
        }
    }
}