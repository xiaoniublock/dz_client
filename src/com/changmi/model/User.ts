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

	private _userName:string;//用户名
	private _goldNum:number;//筹码
	private _headImgData:string;//头像地址
	private _cardNum:number;//手牌数目
	private _seat:number;//所处作为
	private _cards:CardGroups;//用户手牌

	public userNameLabel:eui.Label;
	public goldNumLabel:eui.Label;
	public headImg:eui.Image;
	public progress:eui.Image;
	public smallCardGroup:eui.Group;
	public leftCard:eui.Image;
	public rightCard:eui.Image;
	public playerCardGroup:eui.Group;

	//加载用户头像加载器
	private  imageLoader:egret.ImageLoader=new egret.ImageLoader();

	//计时器
	public timer:egret.Timer= new egret.Timer(50,360);

	private angle:number = 0;

	   /**
		 * 超过计时时间，主动弃牌
		*/
    public static GIVEUP: string = "giveup";
	public get cards():CardGroups{
		return this._cards;
	}
	public initcards(cards:Array<number>){
		for(let i=0;i<cards.length;i++){
			let color=cards[i]/100;
			let index=cards[i]%100;
			this._cards.cards.push(new Card(index,color));
		}
	}

	public get seat():number{
		return this._seat;
	}

	public get userName():string{
		return this._userName;
	}

	public get goldNum():number{
		return this._goldNum;
	}

	public get headImgData():string{
		return this._headImgData;
	}

	public get isCardVisible():boolean{
		return this._isCardVisible;
	}

	public set seat(seat:number){
		this._seat=seat;
	}

	public set userName(userName:string){
		this._userName = userName;
		this.userNameLabel.text = userName;
	}

	public set goldNum(goldNum:number){
		this._goldNum = goldNum;
		this.goldNumLabel.text = "" + goldNum;
	}

	public set headImgData(headImgData:string){
		this._headImgData = headImgData;
		this.imageLoader.once(egret.Event.COMPLETE,(e:egret.Event)=>{
			this.headImg.bitmapData = e.currentTarget.data;
		},this);
        this.imageLoader.load(headImgData);
	}

	public set isCardVisible(isCardVisible:boolean){
		this._isCardVisible = isCardVisible;
		this.smallCardGroup.visible = !isCardVisible;
	}

	public set cardNum(cardNum:number){
		this._cardNum = cardNum;

		if(cardNum == 0){
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

	public createUserSource(userName:string,goldNum:number){//,headImgData:egret.BitmapData){
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
    	
   		//注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
    	function timerFunc()
    {	
       	this.angle += 1;
        changeGraphics(	this.angle);
        this.angle = this.angle % 360;
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
	 public timerComFunc()
    {
		this.dispatchEventWith(User.GIVEUP);
    }
	//开始计时
	public startTimer():void{
        this.timer.start();
	}
	//停止并初始化
	public stopTimer():void{
		this.angle=0;
		this.timer.reset();
	}

	public playerOut():void{
		//颜色矩阵数组
		var colorMatrix = [
    		0.3,0.6,0,0,0,
    		0.3,0.6,0,0,0,
    		0.3,0.6,0,0,0,
    		0,0,0,1,0
			];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		this.filters=[colorFlilter];
	}

	public addChip(chip:number){
		this._goldNum += chip;
		AnimationUtils.getInstance().changeLabelNumber(this.goldNumLabel,chip);
	}

	public reduceChip(chip:number){
		this._goldNum -= chip;
		AnimationUtils.getInstance().changeLabelNumber(this.goldNumLabel,-chip);
	}
}