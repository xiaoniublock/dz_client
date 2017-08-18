class User extends egret.DisplayObjectContainer{
	public constructor(userName:string,goldNum:string){//,headImgData:egret.BitmapData) {
		super();
		this.createUserSource(userName,goldNum);//,headImgData);
	}

	private hasUser:boolean;
	private isYourTurn:boolean;
	private isGiveUp:boolean;

	private _userName:string;
	private _goldNum:string;
	private _headImgData:egret.BitmapData;

	private userNameLabel:egret.TextField;
	private goldNumLabel:egret.TextField;
	private headImg:egret.Bitmap;
	private leftCard:egret.Bitmap;
	private rightCard:egret.Bitmap;

	public get userName():string{
		return this._userName;
	}

	public get goldNum():string{
		return this._goldNum;
	}

	public get headImgData():egret.BitmapData{
		return this._headImgData;
	}

	public createUserSource(userName:string,goldNum:string){//,headImgData:egret.BitmapData){
        this._userName = userName;
		this._goldNum = goldNum;
		// this._headImgData = headImgData;
		this.initUserUI();
    }

	public initUserUI(){
		this.userNameLabel = new egret.TextField();
		this.goldNumLabel = new egret.TextField();
		this.headImg = new egret.Bitmap();
		this.leftCard = new egret.Bitmap(RES.getRes("gamescreen_json.poker_left"));
		this.rightCard = new egret.Bitmap(RES.getRes("gamescreen_json.poker_right"));

		var bgImg = new egret.Shape();
		bgImg.graphics.beginFill(0x1A1A1A,0.7);
		bgImg.graphics.drawRoundRect(0,0,126,174,5,5);
		bgImg.graphics.endFill();
		this.addChild(bgImg);

		this.userNameLabel.text = this._userName;
		this.goldNumLabel.text = this._goldNum;
		this.headImg.texture = RES.getRes("gamescreen_json.moveButton");

		this.userNameLabel.y = 7;
		this.userNameLabel.width = 126;
		this.userNameLabel.textAlign = egret.HorizontalAlign.CENTER;
		this.userNameLabel.size = 25;

		this.goldNumLabel.y = 147;
		this.goldNumLabel.width = 126;
		this.goldNumLabel.textAlign = egret.HorizontalAlign.CENTER;
		this.goldNumLabel.size = 27;
		this.goldNumLabel.textColor = 0xC5B259;

		this.headImg.x = 6;
		this.headImg.y = 32;
		this.headImg.width = 115;
		this.headImg.height = 113;

		this.leftCard.x = 96;
		this.leftCard.y = 60;
		this.leftCard.width = 41;
		this.leftCard.height = 49;

		this.rightCard.x = 104;
		this.rightCard.y = 64;
		this.rightCard.width = 41;
		this.rightCard.height = 49;

		this.addChild(this.userNameLabel);
		this.addChild(this.goldNumLabel);
		this.addChild(this.headImg);
		this.addChild(this.leftCard);
		this.addChild(this.rightCard);
	}
}