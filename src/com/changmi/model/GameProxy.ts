

module game {

	export class GameProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "GameProxy";
		/**
         * 改变底部按钮组
         */
		public static CHANGE_STATE: string = "change_state";
		/**
		 * 
		 */
       
		public constructor() {
			super(GameProxy.NAME);
			console.log(GameProxy.NAME);
			
		}

		 /**开始匹配游戏*/
    	public matchPlayer()
    	{
			this.sendNotification(LobbyCommand.CHANGE, 2);
        // this.start.enabled = false;
        // this.tipTween();

        // var data = new BaseMsg();
        // data.command = Commands.MATCH_PLAYER;
        // this.playerName = Math.floor(Math.random() * 100) + "";
        // data.content = { "name": this.playerName };
        // NetController.getInstance().sendData(data, this.onMatchPlayerBack, this);
    	}

		/**玩家action */
		public playAction(data: BaseMsg){

		}
      
	}
}