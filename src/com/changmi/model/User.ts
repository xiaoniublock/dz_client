class User extends eui.Component{
	public constructor(){
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,():void=>{
			this.initUserUI();
		},this);
	}

	private _hasUser:boolean;		//判断是否有用户在这位置上
	private _isYourTurn:boolean;	//判断是不是该用户的回合
	private _isGiveUp:boolean;		//判断该用户是否已经放弃游戏
	private _isCardVisible:boolean;	//设置是否可见该玩家的牌

	private _userName:string;
	private _goldNum:string;
	private _headImgData:egret.BitmapData;
	private _cardNum:number;

	public userNameLabel:eui.Label;
	public goldNumLabel:eui.Label;
	public headImg:eui.Image;
	public progress:eui.Image;
	public smallCardGroup:eui.Group;
	public leftCard:eui.Image;
	public rightCard:eui.Image;

	//计时器
	public timer:egret.Timer= new egret.Timer(50,360);

	public get userName():string{
		return this._userName;
	}

	public get goldNum():string{
		return this._goldNum;
	}

	public get headImgData():egret.BitmapData{
		return this._headImgData;
	}

	public get isCardVisible():boolean{
		return this._isCardVisible;
	}

	public set userName(userName:string){
		this._userName = userName;
		this.userNameLabel.text = userName;
	}

	public set goldNum(goldNum:string){
		this._goldNum = goldNum;
		this.goldNumLabel.text = goldNum;
	}

	public set headImgData(headImgData:egret.BitmapData){
		this._headImgData = headImgData;
		this.headImg.bitmapData = headImgData;
	}

	public set isCardVisible(isCardVisible:boolean){
		this._isCardVisible = isCardVisible;
		this.smallCardGroup.visible = !isCardVisible;
	}

	public set cardNum(cardNum:number){
		this._cardNum = cardNum;
<<<<<<< Updated upstream
		//console.log(this.userName + this.isCardVisible);
		
		if(this.isCardVisible == true){
=======
		if(cardNum == 0){
>>>>>>> Stashed changes
			this.leftCard.visible = false;
			this.rightCard.visible = false;
		}else if(cardNum == 1){
			this.leftCard.visible = false;
			this.rightCard.visible = true;
		}else{
			this.leftCard.visible = true;
			this.rightCard.visible = true;
		}
	}

	public set hasUser(hasUser:boolean){
		this._hasUser = hasUser;
		this.visible = this._hasUser;
	}

	public set isYourTurn(isYourTurn:boolean){
		this._isYourTurn = isYourTurn;
		if(this._isYourTurn){
			
		}
	}

	public set isGiveUp(isGiveUp:boolean){
		this._isGiveUp = isGiveUp;
		this.alpha = isGiveUp ? 0.5 : 1;
		this.cardNum = 0;
	}

	public createUserSource(userName:string,goldNum:string){//,headImgData:egret.BitmapData){
		//this.initUserUI();
        this.userName = userName;
		this.goldNum = goldNum;
		// this._headImgData = headImgData;
		
    }

	public initUserUI(){
		this.startTimer();
		var w:number = this.progress.width;
    	var h:number = this.progress.height;
		var r:number = Math.max(w, h) / 2 * 1.8;
    	var shape:egret.Shape = new egret.Shape();
		shape.anchorOffsetX=0;
		shape.anchorOffsetY=0;
    	shape.x = w/ 2;
    	shape.y =h / 2;
    	this.progress.mask = shape;
    	this.addChild(shape);
    	var angle = 0;
   		//注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,timerComFunc,this);
    	function timerFunc()
    {	
       angle += 1;
        changeGraphics(angle);
        angle = angle % 360;
    }
    function timerComFunc()
    {
        console.log("计时结束");
    }
    
    function changeGraphics(angle) {
        shape.graphics.clear();
        shape.graphics.beginFill(0x00ffff, 1);
        shape.graphics.lineTo(r, 0);
        shape.graphics.drawArc(0, 0, r, 0, angle * Math.PI / 180, true);
        shape.graphics.lineTo(0, 0);
        shape.graphics.endFill();
    }
	}
	//开始计时
	public startTimer():void{
        this.timer.start();
	}
	//停止并初始化
	public stopTimer():void{
		this.timer.reset();
	}
}