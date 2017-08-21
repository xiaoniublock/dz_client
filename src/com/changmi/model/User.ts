class User extends eui.Component{
	public constructor(){
		super();
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
		console.log(this.userNameLabel.text);
		
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
}