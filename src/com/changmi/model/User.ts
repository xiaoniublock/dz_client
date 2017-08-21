class User extends eui.Component{
	public constructor(userName:string,goldNum:string){//,headImgData:egret.BitmapData) {
		super();
		if(!userName){
			this._hasUser = false;
		}
		this.createUserSource(userName,goldNum);//,headImgData);
	}

	private _hasUser:boolean;		//判断是否有用户在这位置上
	private _isYourTurn:boolean;	//判断是不是该用户的回合
	private _isGiveUp:boolean;		//判断该用户是否已经放弃游戏

	private _userName:string;
	private _goldNum:string;
	private _headImgData:egret.BitmapData;

	public userNameLabel:eui.Label;
	public goldNumLabel:eui.Label;
	public headImg:eui.Image;

	public get userName():string{
		return this._userName;
	}

	public get goldNum():string{
		return this._goldNum;
	}

	public get headImgData():egret.BitmapData{
		return this._headImgData;
	}

	public set userName(userName:string){
		this._userName = userName;
		this.userNameLabel.text = userName;
		console.log(userName);
		
	}

	public set goldNum(goldNum:string){
		this._goldNum = goldNum;
		this.goldNumLabel.text = goldNum;
	}

	public set headImgData(headImgData:egret.BitmapData){
		this._headImgData = headImgData;
		this.headImg.bitmapData = headImgData;
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
	}

	public createUserSource(userName:string,goldNum:string){//,headImgData:egret.BitmapData){
		this.initUserUI();
        this.userName = userName;
		this.goldNum = goldNum;
		// this._headImgData = headImgData;
		
    }

	public initUserUI(){
		this.skinName = "UserInfoDisplaySkin";
		// this.userNameLabel = new egret.TextField();
		// this.goldNumLabel = new egret.TextField();
		// this.headImg = new egret.Bitmap();
		// this.leftCard = new egret.Bitmap(RES.getRes("gamescreen.poker_left"));
		// this.rightCard = new egret.Bitmap(RES.getRes("gamescreen.poker_right"));

		// var bgImg = new egret.Shape();
		// bgImg.graphics.beginFill(0x1A1A1A,0.7);
		// bgImg.graphics.drawRoundRect(0,0,126,174,5,5);
		// bgImg.graphics.endFill();
		// this.addChild(bgImg);

		// this.userNameLabel.text = this._userName;
		// this.goldNumLabel.text = this._goldNum;
		// this.headImg.texture = RES.getRes("gamescreen.orangeButton");

		// this.userNameLabel.y = 7;
		// this.userNameLabel.width = 126;
		// this.userNameLabel.textAlign = egret.HorizontalAlign.CENTER;
		// this.userNameLabel.size = 25;

		// this.goldNumLabel.y = 147;
		// this.goldNumLabel.width = 126;
		// this.goldNumLabel.textAlign = egret.HorizontalAlign.CENTER;
		// this.goldNumLabel.size = 27;
		// this.goldNumLabel.textColor = 0xC5B259;

		// this.headImg.x = 6;
		// this.headImg.y = 32;
		// this.headImg.width = 115;
		// this.headImg.height = 113;

		// this.leftCard.x = 96;
		// this.leftCard.y = 60;
		// this.leftCard.width = 41;
		// this.leftCard.height = 49;

		// this.rightCard.x = 104;
		// this.rightCard.y = 64;
		// this.rightCard.width = 41;
		// this.rightCard.height = 49;

		// this.addChild(this.userNameLabel);
		// this.addChild(this.goldNumLabel);
		// this.addChild(this.headImg);
		// this.addChild(this.leftCard);
		// this.addChild(this.rightCard);
	}
}