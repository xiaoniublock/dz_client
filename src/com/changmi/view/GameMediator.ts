module game {

    export class GameMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "GameScreenMediator";
        public num=0;
        public constructor(viewComponent: any) {
            super(GameMediator.NAME, viewComponent);
            this.gameScreen.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backButtonClick, this);
            this.gameScreen.switchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchButtonClick, this);
            this.gameScreen.checkBox_giveUp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);
            this.gameScreen.checkBox_autoPass.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);
            this.gameScreen.checkBox_followAny.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);
            this.gameScreen.giveUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.giveupAction,this);
            this.gameScreen.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.passAction,this);
            this.gameScreen.addChipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addChipAction,this);
            
            this.gameScreen.MoneyBtnSmallest.addEventListener(egret.TouchEvent.TOUCH_TAP,this.countBetNum,this);
            this.gameScreen.MoneyBtnSmall.addEventListener(egret.TouchEvent.TOUCH_TAP,this.countBetNum,this);
            this.gameScreen.MoneyBtnNormal.addEventListener(egret.TouchEvent.TOUCH_TAP,this.countBetNum,this);
            this.gameScreen.MoneyBtnBig.addEventListener(egret.TouchEvent.TOUCH_TAP,this.countBetNum,this);
            this.gameScreen.MoneyBtnBiggest.addEventListener(egret.TouchEvent.TOUCH_TAP,this.countBetNum,this);
            this.gameScreen.RangeMoneyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.countBetNum,this);


            this.gameScreen.multipleBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.countBetMul,this);
            this.gameScreen.multipleBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.countBetMul,this);
            this.gameScreen.multipleBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.countBetMul,this);
            this.gameScreen.users[3].addEventListener(User.GIVEUP,function(){
                console.log("users[3]计时结束");
                
            },this);


        }
    ///处理复选框的change事件回调
    private onChange(event:egret.TouchEvent) {
        ///获得当前复选框
        var checkBox:eui.CheckBox = <eui.CheckBox>event.target;

        switch (checkBox.name){ //强行单选化
            case "giveUp":{
                console.log(checkBox.name);
                this.gameScreen.checkBox_autoPass.selected = false;
                this.gameScreen.checkBox_followAny.selected = false;
                break;
            }
            case "autoPass":{
                console.log(checkBox.name);
                this.gameScreen.checkBox_giveUp.selected = false;
                this.gameScreen.checkBox_followAny.selected = false;
                break;
            }
            case "followAny":{
                console.log(checkBox.name);
                this.gameScreen.checkBox_giveUp.selected = false;
                this.gameScreen.checkBox_autoPass.selected = false;
                break;
            }
        }
        
        

        if (checkBox.currentState === "disabled" || checkBox.currentState === "disabledAndSelected" ) {
            // label.text = "禁用状态，无法选择";
        } else {
            ///获得当前复选框的标签并显示出来
            console.log(checkBox.selected);
            ///取消显示设置复选框的状态，由内部的 getCurrentState() 决定。
            // checkBox.currentState = null;
        }

    }
       
        public backButtonClick(event: egret.TouchEvent){
            console.warn("点击返回");
            this.sendNotification(LobbyCommand.CHANGE, 1);
        }
        public switchButtonClick(event: egret.TouchEvent){
            let stats:Array<String>=["first_Bet","count_choose","three_choose"];

           this.sendNotification(GameProxy.CHANGE_STATE, stats[this.num%3]);
           this.num++;
        }
          public listNotificationInterests(): Array<any> {
            return [
                GameProxy.CHANGE_STATE,
                GameProxy.MATCHPLAYER
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case GameProxy.CHANGE_STATE: {
                    this.gameScreen.switchBottomState(<String><any>data);
                    break;
                }
                case GameProxy.MATCHPLAYER:{
                    console.log(<BaseMsg>data.content.roomId);
                    
                }

               
            }
        }
        public get gameScreen(): GameScreen {
            return <GameScreen><any>(this.viewComponent);
        }

        public giveupAction(event:egret.TouchEvent){
            this.gameScreen.giveChipAction(parseInt(this.gameScreen["baseChipNum"].text),4);
        }

        public passAction(event:egret.TouchEvent){
            for(var i = 0;i < 7;i++){
                if(this.gameScreen.chips[i].chipNum != 0){
                    this.gameScreen.chips[i].gotoBaseAnimation(this.gameScreen["baseChipNum"]);
                }
            }
        }

        public addChipAction(event:egret.TouchEvent){
            this.sendNotification(GameProxy.CHANGE_STATE, "count_choose");
        }

        public countBetNum(event:egret.TouchEvent){
            this.gameScreen.addChipAnimation(parseInt(event.currentTarget.label),4);
        }

         public countBetMul(event:egret.TouchEvent){
             console.log(<eui.Button>event.currentTarget.label);
         }
    }
}