

module game {

	export class GameProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "GameProxy";
		/**
         * 改变底部按钮组
         */
		public static CHANGE_STATE: string = "change_state";
		/**
		 * 匹配成功返回这张桌子上的玩家数据
		 */
       	public static MATCHPLAYER: string = "match_player";


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
        var data = new BaseMsg();
        data.command = Commands.MATCH_PLAYER;
        data.content = { "name": "112" };
        NetController.getInstance().sendData(data, this.onMatchPlayerBack, this);
    	}
		private onMatchPlayerBack(data:BaseMsg){
			this.sendNotification(GameProxy.MATCHPLAYER,data);
		  }

		/**玩家action */
		public playAction(data: BaseMsg){

		}
      
	}
}