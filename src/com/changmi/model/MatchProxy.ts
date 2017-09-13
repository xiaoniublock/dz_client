// TypeScript file
module game {

	export class MatchProxy extends puremvc.Proxy implements puremvc.IProxy {
        public static NAME: string = "MatchProxy";
        /**
		 * 匹配成功返回这张桌子上的玩家数据
		 */
       	public static MATCHPLAYER: string = "match_player";

        public constructor() {
			super(MatchProxy.NAME);
		}
           	 /**开始匹配游戏*/
    	public matchPlayer()
    	{
            NetController.getInstance().connectMatch();
            NetController.getInstance().addSocketStateListener(NetController.CONNECTSUCCEED,(evt:egret.Event)=>{
               console.log(evt.data);
                switch(evt.data){
                    //匹配服务连接成功发送用户id
                   case "match":
                    var data = new BaseMsg();
                    data.command = Commands.MATCH_PLAYER;
                    data.content = { "name": "112" };
                    NetController.getInstance().sendData(data, this.onGetTableId, this);
                   break;
                   //游戏服务连接成功发送桌子id
                   case "game":
                   var data = new BaseMsg();
                    data.command = Commands.MATCH_PLAYER;
                    data.content = { "name": "112" };
                    NetController.getInstance().sendData(data, this.onMatchPlayerBack, this);
                   break;
               }
              
            });
             NetController.getInstance().addSocketStateListener(NetController.CLOSESUCCEED,(evt:egret.Event)=>{
                 switch(evt.data){
                   case "match":
                   //匹配服务关闭成功开始连接游戏服务
                    NetController.getInstance().connectGame();
                   break;
                   case "game":
                   break;
               }
               console.log(evt.data);
            });
            /**
             * 打开加载中界面
             */
		this.sendNotification(LobbyCommand.CHANGE, 2);
        // this.start.enabled = false;
        // this.tipTween();
        
    	}
         public startGame(){
            this.sendNotification(LobbyCommand.CHANGE, 3);
        }

        /**获取tableid,关闭匹配服务器*/
		private onGetTableId(data:BaseMsg){
            console.warn("onGetTableId"+data);
            NetController.getInstance().close();
			//this.sendNotification(MatchProxy.MATCHPLAYER,data);
		  }
        /**匹配完成获取桌上信息，关闭加载中界面，进行跳转 */
		private onMatchPlayerBack(data:BaseMsg){
            console.warn("onMatchPlayerBack"+data);
            //NetController.getInstance().close();
			//this.sendNotification(MatchProxy.MATCHPLAYER,data);
		  }
          
    }
}