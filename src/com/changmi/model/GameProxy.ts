

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
        	NetController.getInstance().addListener(Commands.PLAYERBET, this);
			NetController.getInstance().addListener(Commands.PUSH_PUBLICCARD, this);
			NetController.getInstance().addListener(Commands.PUSH_OWNCARD, this);
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
      
	    /**收到服务器消息*/
    private onReciveMsg(data:BaseMsg)
    {
        let command = data.command;
        console.warn('onReciveMsg', command);
        switch (command)
        {
            case Commands.PLAYERBET:
                this.onRecivePlayGame(data.content);
                break;
            case Commands.PUSH_PUBLICCARD:
                //this.onRecivePlayGame(data.content);
                break;
            case Commands.PUSH_OWNCARD:
                //this.onRecivePlayGame(data.content);
                break;
            /*留下其他*/
        }
    }

    /**房间消息*/
    private onRecivePlayGame(content):void
    {
        //0是玩家下注, 1是玩家让, 2是玩家弃牌，3得出结果
        let state = content.state;
        console.warn('state', state);
        if(state == undefined) return;
        switch(state)
        {
            case 0 :
                // this.my_cards = content.cards.sort(function(a,b){return b-a});
                // this.refreshMyCard(this.my_cards);
                break;
            case 1 :
                //this.onGamePlay(content);
                break;
            case 2 :
                //this.onGameOver(content);
                break;
			case 3 :
                //this.onGameOver(content);
                break;
           
        }
    }


	}
}