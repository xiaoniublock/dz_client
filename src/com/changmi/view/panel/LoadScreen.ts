module game{
	export class LoadScreen extends eui.Component {

		public loadLabel: eui.Label;
		public chipImg: eui.Image;

		private playCount:number = 0;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
		}

		public createCompleteEvent(){
			this.skinName = "skins.LoadingToDeskSkin";
			this.startrotateAndChangeSource();
		}

		public startrotateAndChangeSource(){
        	this.addEventListener(egret.Event.ENTER_FRAME,this.chipTurn,this);
			this.addEventListener(egret.Event.ENTER_FRAME,this.loadingTurn,this);
    	}

    	public stoprotate(){
        	this.playCount = 0;
			LoadMediator.getInstance().startAction();
        	this.removeEventListener(egret.Event.ENTER_FRAME,this.chipTurn,this);
			this.removeEventListener(egret.Event.ENTER_FRAME,this.loadingTurn,this);
    	}

		public chipTurn(){
			var speed = 40;     //旋转速度，数字越小速度越快
			var index = this.playCount % speed;
			var angle1 = (index * Math.PI / (speed / 2));
			var angle2 = (index + 1) * Math.PI / (speed / 2);
			var changeX = 30 * (Math.cos(angle1) - Math.cos(angle2));

			if(this.playCount == speed){
            	this.stoprotate();
            	return;
        	}

			if(index < speed / 4 || index > 3 * speed / 4 - 1){
				this.chipImg.x += changeX;
				this.chipImg.width -= 2 * changeX;
			}else{
				this.chipImg.x -= changeX;
				this.chipImg.width += 2 * changeX;
			}
			this.playCount++;
		}

		public loadingTurn(){
			var speed = 3;     //加点速度，每N帧1次
			this.loadLabel.text = "loading";
			for(var i = 0;i < this.playCount % (5 * speed);i += speed){
				this.loadLabel.text += ".";
			}
		}
	}
}