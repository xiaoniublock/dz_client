    class NetController
    {
        private static _instance:NetController;
        public static MATCHSOCKET:number=1;
        public static GAMESOCKET:number=2;
        private wsMatch:WS;
        private wsGame:WS;
        private sequence:number = 1;
        private dispatcher:egret.EventDispatcher;
        /**用来存储对应sequence的回调函数，在得到服务器返回后执行*/
        private callBackPool = {};

        /**连接成功 */
        public static CONNECTSUCCEED: string = "CONNECTSUCCEED";
        /**断开成功 */
        public static CLOSESUCCEED: string = "CLOSESUCCEED";

        public constructor(){
            this.dispatcher = new egret.EventDispatcher();
        }

        public static getInstance(){
            if(!this._instance){
                this._instance = new NetController();
            }
            return this._instance;
        }
    /**匹配服务器 */
        public connectMatch():void
        {
            if(!this.wsMatch)
            {
                this.wsMatch = new WS();
            }
                this.wsMatch.connect("192.168.1.70", 9000,"match");
                // this.wsMatch.connect("echo.websocket.org", 80,"match");
                // this.wsMatch.connect("192.168.1.121", 8182,"match");
        }
    /**游戏服务器 */
        public connectGame():void
        {
            if(!this.wsGame)
            {
                this.wsGame = new WS();
            }
                // this.wsGame.connect("192.168.1.70", 5678,"game");
                this.wsGame.connect("echo.websocket.org", 80,"game");
                // this.wsGame.connect("192.168.1.121", 8182,"game");
        }
        public close(type:number):void{
            switch(type){
                case NetController.MATCHSOCKET:
                this.wsMatch.close();
                break;
                case NetController.GAMESOCKET:
                this.wsGame.close();
                break;
            }
        }

        /**读取数据*/
        public readData(msg:BaseMsg):void
        {
            let seq = msg.seq;
            if(seq)
            {
                console.log('来自服务器的返回消息 ：' + msg);
                let callBack = this.callBackPool[seq];
                if(callBack)
                {
                    callBack.callback.call(callBack.thisObj, msg);
                    this.callBackPool[seq] = null;
                }
                delete this.callBackPool[seq];
            }else //没有seq说明是服务器主动发送的
            {
                console.log('来自服务器的主动消息 ：' + msg);
                this.dispatcher.dispatchEventWith(msg.command+'', false, msg);
            }
        }

        /**接收到数据时都事件监听*/
        public addListener(command, obj)
        {
            this.dispatcher.addEventListener(command+'', (e:egret.Event)=>{obj.onReciveMsg(e.data)}, this);
        }

        /**发送数据*/
        public sendData(type:number,data:BaseMsg, callback:Function = null, thisObj)
        {
            data.seq = this.sequence++;
            switch(type){
                case NetController.MATCHSOCKET:
                this.wsMatch.sendData(JSON.stringify(data));
                break;
                case NetController.GAMESOCKET:
                this.wsGame.sendData(JSON.stringify(data));
                break;
            }
            if(callback && thisObj)
            {
                this.callBackPool[data.seq] = {callback:callback, thisObj:thisObj};
            }
        }

        /**打印*/
        public showState(s:string):void
        {
            console.warn(s);
        }

        /**接收到数据时都事件监听*/
        public addSocketStateListener(command,callback )
        {
            this.dispatcher.addEventListener(command+"",callback,this);
        }
        /**接收到数据时都事件监听*/
        public removeSocketStateListener(command,callback )
        {
            this.dispatcher.removeEventListener(command+"",callback,this);
        }

        public sendSocketSucceed(type):void{
            this.dispatcher.dispatchEventWith(NetController.CONNECTSUCCEED,true,type);
        }
        public sendSocketClose(type):void{
            this.dispatcher.dispatchEventWith(NetController.CLOSESUCCEED,true,type);
        }
    }

    /**基本的消息格式*/
    class BaseMsg {	
        public command: number;
        public code: number;
        public seq: number;
        public content: any;
    }

    /**基本操作代码*/
    class Commands {
        public static SYSTEM_MSG = 1;
        public static REGISTER = 2;
        public static LOGIN = 3;
        public static MATCH_PLAYER = 4;
        public static PLAYERBET = 5;
        public static PUSH_OWNCARD = 6;
        public static PUSH_PUBLICCARD = 7;
        public static ADD_PLAYER = 8;
        public static REM_PLAYER = 9;
    }