module game {

	export class LoadMediator extends puremvc.Mediator implements puremvc.IMediator {

		public static NAME: string = "LoadScreenMediator";

		/**开始旋转 */
    	public static BEGIN_ROTATE: string = "begin_rotate";
    	/**停止旋转 */
    	public static STOP_ROTATE: string = "stop_rotate";
		/**点击返回 */
    	public static PRESS_BACK: string = "press_back";

		public timer:egret.Timer;

		public constructor(viewComponent: any) {
            super(LoadMediator.NAME, viewComponent);
			this.timer = new egret.Timer(1000, 22);
			this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeOver,this);
		}

		public listNotificationInterests(): Array<any> {
            return [
                LoadMediator.BEGIN_ROTATE,
				LoadMediator.STOP_ROTATE,
				LoadMediator.PRESS_BACK
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case LoadMediator.BEGIN_ROTATE: {
                    this.timer.start();
                    break;
                }
				case LoadMediator.STOP_ROTATE: {
                    this.timer.reset();
					this.loadScreen.stoprotate();
                    break;
                }
				case LoadMediator.PRESS_BACK:{
					this.timer.reset();
					this.backAction();
				}
			}
		}

		public timeOver(){
			game.TextUtils.showTextTip("系统出错，嗷了个嗷！！！");
			this.backAction();
		}

		public backAction(){
			this.loadScreen.stoprotate();
			this.sendNotification(LobbyCommand.CHANGE, 1);
			if (NetController.getInstance().isConnected(NetController.MATCHSOCKET)){
				NetController.getInstance().close(NetController.MATCHSOCKET);
			}
			if (NetController.getInstance().isConnected(NetController.GAMESOCKET)){
				NetController.getInstance().close(NetController.GAMESOCKET);
			}
		}

		public startAction() {
			this.sendNotification(GameCommand.START_GAME);
		}

		public get loadScreen(): LoadScreen {
			return <LoadScreen><any>(this.viewComponent);
		}
	}
}