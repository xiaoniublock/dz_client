class User extends eui.Component {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, (): void => {
			this.initUserUI();
		}, this);
	}

	private _hasUser: boolean;		//判断是否有用户在这位置上
	private _isYourTurn: boolean;	//判断是不是该用户的回合
	private _isGiveUp: boolean;		//判断该用户是否已经放弃游戏
	private _isCardVisible: boolean;	//设置是否可见该玩家的牌

	private _uId: string;//用户ID
	private _name: string;//用户名
	private _money: number;//筹码
	private _headImgData: string;//头像地址
	private _cardNum: number;//手牌数目
	private _seat: number;//桌上实际所处位置
	private _chairId: number;//服务端返回玩家位置
	private _cards: CardGroups;//用户手牌
	private _stake: number;//当前下的注

	public userNameLabel: eui.Label;
	public goldNumLabel: eui.Label;
	public headImg: eui.Image;
	public progress: eui.Image;
	public smallCardGroup: eui.Group;
	public leftCard: eui.Image;
	public rightCard: eui.Image;
	public playerCardGroup: eui.Group;

	//加载用户头像加载器
	private imageLoader: egret.ImageLoader = new egret.ImageLoader();

	private _angle: number = 0;	//0~360,表示倒计时

	/**
	  * 超过计时时间，主动弃牌
	 */
	public static GIVEUP: string = "giveup";
	public get cards(): CardGroups {
		return this._cards;
	}
	public initcards(cards: Array<number>) {
		for (let i = 0; i < cards.length; i++) {
			let color = cards[i] / 100;
			let index = cards[i] % 100;
			this._cards.cards.push(new Card(index, color));
		}
	}

	public get uId(): string {
		return this._uId;
	}

	public get chairId(): number {
		return this._chairId;
	}
	public get seat(): number {
		return this._seat;
	}

	public get name(): string {
		return this._name;
	}

	public get money(): number {
		return this._money;
	}

	public get stake(): number {
		return this._stake;
	}

	public get headImgData(): string {
		return this._headImgData;
	}

	public get isCardVisible(): boolean {
		return this._isCardVisible;
	}

	public get angle(): number {
		return this._angle;
	}

	public set uId(uId: string) {
		this._uId = uId;
	}

	public set seat(seat: number) {
		this._seat = seat;
	}
	public set chairId(chairId: number) {
		this._chairId = chairId;
	}

	public set name(name: string) {
		this._name = name;
		if (this.userNameLabel)
			this.userNameLabel.text = name;
	}

	public set money(money: number) {
		this._money = money;
		if (this.goldNumLabel)
			this.goldNumLabel.text = "" + money;
	}

	public set headImgData(headImgData: string) {
		this._headImgData = headImgData;
		if (this.headImg) {
			this.imageLoader.once(egret.Event.COMPLETE, (e: egret.Event) => {
				this.headImg.bitmapData = e.currentTarget.data;
			}, this);
			this.imageLoader.load(headImgData);
		}
	}

	public set isCardVisible(isCardVisible: boolean) {
		this._isCardVisible = isCardVisible;
		if (this.smallCardGroup)
			this.smallCardGroup.visible = !isCardVisible;
	}

	public set cardNum(cardNum: number) {
		this._cardNum = cardNum;

		if (cardNum == 0) {
			this.leftCard.visible = false;
			this.rightCard.visible = false;
		} else if (cardNum == 1) {
			this.leftCard.visible = false;
			this.rightCard.visible = true;
		} else {
			this.leftCard.visible = true;
			this.rightCard.visible = true;
		}
	}

	public set hasUser(hasUser: boolean) {
		this._hasUser = hasUser;
		this.visible = this._hasUser;
	}

	public set isYourTurn(isYourTurn: boolean) {
		this._isYourTurn = isYourTurn;
		if (this._isYourTurn) {

		}
	}

	public set isGiveUp(isGiveUp: boolean) {
		this._isGiveUp = isGiveUp;
		this.alpha = isGiveUp ? 0.5 : 1;
		this.cardNum = 0;
	}

	public set angle(angle: number) {
		this._angle = angle;
		this.changeGraphics();
	}

	public createUserSource(userName: string, money: number) {//,headImgData:egret.BitmapData){
		//this.initUserUI();
		this.name = name;
		this.money = money;
		// this._headImgData = headImgData;

	}

	private shape: egret.Shape = new egret.Shape();
	private r: number;
	public initUserUI() {
		var w: number = this.progress.width;
		var h: number = this.progress.height;
		this.r = Math.max(w, h) / 2 * 1.8;

		this.shape.anchorOffsetX = 0;
		this.shape.anchorOffsetY = 0;
		this.shape.x = w / 2;
		this.shape.y = h / 2;
		this.progress.mask = this.shape;
		this.addChild(this.shape);
	}

	public startrotate(lastTime:number) {
		this.angle = (30 - lastTime) * 1000 / 30;
		this.stage.frameRate = 50;
		this.addEventListener(egret.Event.ENTER_FRAME, this.frameFun, this);
	}

	public stoprotate() {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.frameFun, this);
		this.dispatchEventWith(User.GIVEUP);
	}

	public frameFun(){
		this._angle += 1;
		this.angle = this.angle % 1000;
	}

	private changeGraphics() {
		if (this.angle >= 333 && this.angle < 667) {
			this.setProgressCircleTwo();
		} else if (this.angle >= 667 && this.angle != 1000) {
			this.setProgressCircleThree();
		} else {
			this.resetProgressCircle();
		}
		if (this.angle < 1) {
			this.angle = 1000;
			this.stoprotate();
		}
		this.shape.graphics.clear();
		this.shape.graphics.beginFill(0x00ffff, 1);
		this.shape.graphics.lineTo(0, 0);
		this.shape.graphics.drawArc(0, 0, this.r, -250 * Math.PI / 500, (this.angle - 250) * Math.PI / 500, true);
		this.shape.graphics.lineTo(0, 0);
		this.shape.graphics.endFill();
	}

	public playerOut(): void {
		//颜色矩阵数组
		var colorMatrix = [
			1, 0, 0, 0, 0,
			0, 1, 0, 0, 0,
			0, 0, 1, 0, 0,
			0, 0, 0, 0.5, 0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		this.filters = [colorFlilter];
	}

	public resetPlayerOut(): void {
		//颜色矩阵数组
		var colorMatrix = [
			1, 0, 0, 0, 0,
			0, 1, 0, 0, 0,
			0, 0, 1, 0, 0,
			0, 0, 0, 1, 0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		this.filters = [colorFlilter];
	}

	public resetProgressCircle(): void {
		//颜色矩阵数组
		var colorMatrix = [
			1, 0, 0, 0, 0,
			0, 1, 0, 0, 0,
			0, 0, 1, 0, 0,
			0, 0, 0, 1, 0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		this.progress.filters = [colorFlilter];
	}

	public setProgressCircleTwo(): void {
		//颜色矩阵数组
		var colorMatrix = [
			1, 0, 0, 0, 104,
			0, 1, 0, 0, -62,
			0, 0, 1, 0, 0,
			0, 0, 0, 1, 0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		this.progress.filters = [colorFlilter];
	}

	public setProgressCircleThree(): void {
		//颜色矩阵数组
		var colorMatrix = [
			1, 0, 0, 0, 104,
			0, 1, 0, 0, -183,
			0, 0, 1, 0, -81,
			0, 0, 0, 1, 0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		this.progress.filters = [colorFlilter];
	}

	public addChip(chip: number) {
		this._money += chip;
		AnimationUtils.getInstance().changeLabelNumber(this.goldNumLabel, chip);
	}

	public reduceChip(chip: number) {
		this._money -= chip;
		AnimationUtils.getInstance().changeLabelNumber(this.goldNumLabel, -chip);
	}
}