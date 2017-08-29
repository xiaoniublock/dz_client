module game {

    export class GameMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "GameScreenMediator";
        public num=0;
        public constructor(viewComponent: any) {
            super(GameMediator.NAME, viewComponent);
            this.gameScreen.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backButtonClick, this);
            this.gameScreen.switchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchButtonClick, this);
            this.gameScreen.checkBox_giveUp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);
            this.gameScreen.giveUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.giveupAction,this);
            this.gameScreen.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.passAction,this);
            this.gameScreen.addChipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addChipAction,this);
        
             console.log( this.gameScreen.checkBox_giveUp.label);
        }
    ///处理复选框的change事件回调
    private onChange(event:egret.TouchEvent) {
        ///获得当前复选框
        var checkBox:eui.CheckBox = <eui.CheckBox>event.target;

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
                GameProxy.CHANGE_STATE,GameProxy.MATCHPLAYER
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
            
        }

        public passAction(event:egret.TouchEvent){
            
        }

        public addChipAction(event:egret.TouchEvent){
            this.sendNotification(GameProxy.CHANGE_STATE, "count_choose");
        }
    }
}