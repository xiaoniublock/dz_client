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
                NetController.getInstance().addSocketStateListener(NetController.CONNECTSUCCEED,this.stateFunction);
                NetController.getInstance().connectMatch();
                // 打开加载中界面
                this.sendNotification(LobbyCommand.CHANGE, 2);
                // this.start.enabled = false;
                // this.tipTween();
            
            }
            private stateFunction(evt:egret.Event){
                console.log(evt.data);
                        switch(evt.data){
                        //匹配服务连接成功发送用户id
                    case "match":
                        var data = new BaseMsg();
                        // data.command = Commands.MATCH_PLAYER;
                        data.content = { "name": "112" };
                        NetController.getInstance().sendData(NetController.MATCHSOCKET, data, (data:BaseMsg)=>{
                            console.warn("onGetTableId"+data);
                            NetController.getInstance().close(NetController.MATCHSOCKET);
                            NetController.getInstance().connectGame();}
                            , this);
                    break;
                    //游戏服务连接成功发送桌子id
                    case "game":
                    var data = new BaseMsg();
                        data.command = Commands.MATCH_PLAYER;
                        data.content = { "name": "112" };
                        NetController.getInstance().sendData(NetController.GAMESOCKET,data, (data:BaseMsg)=>{
                            console.warn("onMatchPlayerBack"+data);
                            NetController.getInstance().removeSocketStateListener(NetController.CONNECTSUCCEED,this.stateFunction);
                        }
                        , this);
                    break;
                }
                
                }
            public startGame(){
                this.sendNotification(LobbyCommand.CHANGE, 3);
            }

            
        }
    }