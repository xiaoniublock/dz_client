class Chip extends eui.Component{
	public constructor() {
		super();
	}

	private _isRight:boolean;		//判断该控件应该左图标还是右图标，true为右

	private _chipNum:number;

	public chipLabel:eui.Label;
	public chipIcon:eui.Image;

	public get chipNum():number{
		return this._chipNum;
	}

	public set chipNum(chipNum:number){
		this._chipNum = chipNum;
		this.chipLabel.text = "" + chipNum;
		this.visible = chipNum == 0 ? false : true;
		if(chipNum <= 300){
			this.chipIcon.texture = RES.getRes("gamescreen.chip_50-300");
		}else if(chipNum <= 1000){
			this.chipIcon.texture = RES.getRes("gamescreen.chip_300-1000");
		}else if(chipNum <= 2500){
			this.chipIcon.texture = RES.getRes("gamescreen.chip_1000-2500");
		}else if(chipNum <= 5000){
			this.chipIcon.texture = RES.getRes("gamescreen.chip_2500-5000");
		}else{
			this.chipIcon.texture = RES.getRes("gamescreen.chip_5000_more");
		}
	}

	public set isRight(isRight:boolean){
		this._isRight = isRight;
		if(isRight){
			this.chipIcon.x = 96;
			this.chipLabel.x = 0;
		}
	}
}