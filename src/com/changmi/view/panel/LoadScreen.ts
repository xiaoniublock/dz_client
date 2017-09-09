module game{
	export class LoadScreen extends eui.Component {

		public loadLabel: eui.Label;
		public chipImg: eui.Image;
		
		public chipTimer:egret.Timer= new egret.Timer(20,100);
		public loadingTimer:egret.Timer= new egret.Timer(50,40);

		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE, this.createCompleteEvent, this);
		}

		public createCompleteEvent(){
			this.skinName = "skins.LoadingToDeskSkin";

			this.chipTimer.addEventListener(egret.TimerEvent.TIMER,this.chipTurn,this);
			this.startTimer(this.chipTimer);
			this.loadingTimer.addEventListener(egret.TimerEvent.TIMER,this.loadingTurn,this);
			this.loadingTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.stopTimer,this);
			this.startTimer(this.loadingTimer);
		}

		public chipTurn(){
			if(this.chipTimer.currentCount % 20 < 10){
				this.chipImg.x += 3;
				this.chipImg.width -= 6;
			}else{
				this.chipImg.x -= 3;
				this.chipImg.width += 6;
			}
		}

		public loadingTurn(){
			this.loadLabel.text = "loading";
			for(var i = 0;i < this.loadingTimer.currentCount % 5;i++){
				this.loadLabel.text += ".";
			}
		}

		//开始计时
		public startTimer(timer:egret.Timer):void{
        	timer.start();
		}

		//停止并初始化
		public stopTimer():void{
			this.chipTimer.stop();
			this.loadingTimer.stop();
			LoadMediator.getInstance().startAction();
		}
	}
}