class WS {
    private WebSocket: egret.WebSocket;

    /*是否用二进制发送数据*/
    private isBin: boolean = false;
    private type: string;
    public constructor() {

    }

    public connect(url, port, type): void {
        this.type = type;
        if (!this.WebSocket) {
            this.WebSocket = new egret.WebSocket();
            this.WebSocket.type = this.isBin ? egret.WebSocket.TYPE_BINARY : egret.WebSocket.TYPE_STRING;
            this.WebSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.WebSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.WebSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.WebSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        }
        if (!this.WebSocket.connected)
            this.WebSocket.connect(url, port);
    }
    public close(): void {
        this.WebSocket.close();
    }
    public connected():boolean{
        return this.WebSocket.connected;
    }

    private onReceiveMessage(e: egret.Event): void {
        console.log('socket  收到了消息');
        if (this.isBin) {
            var byte: egret.ByteArray = new egret.ByteArray();
            this.WebSocket.readBytes(byte);
            var msg: string = byte.readUTF();
            console.log('收到二进制数据', "readBYTE:" + msg);
        } else {
            var msg = this.WebSocket.readUTF();
            console.log('收到字符串数据', 'readUTF:' + msg);
        }
        NetController.getInstance().readData(JSON.parse(msg));
    }

    public sendData(data: string): void {
        console.log('发出消息' + data);
        if (this.isBin) {
            var byte: egret.ByteArray = new egret.ByteArray();
            byte.writeUTF(data);
            byte.position = 0;
            this.WebSocket.writeBytes(byte, 0, byte.bytesAvailable);
        } else {
            this.WebSocket.writeUTF(data);
        }
    }

    private onSocketOpen(): void {
        NetController.getInstance().showState("socket 连接上了");
        NetController.getInstance().sendSocketSucceed(this.type);
    }
    private onSocketClose(): void {
        NetController.getInstance().showState("socket 关闭了");
        NetController.getInstance().sendSocketClose(this.type);
    }
    private onSocketError(): void {
        NetController.getInstance().showState("socket error");
        NetController.getInstance().sendSocketError(this.type);
    }
}