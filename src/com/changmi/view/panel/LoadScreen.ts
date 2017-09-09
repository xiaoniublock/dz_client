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

		public startrotateAndChangeSource(){
        	this.addEventListener(egret.Event.ENTER_FRAME,this.chipTurn,this);
    	}

		public chipTurn(){
			var index = (this.chipTimer.currentCount - 1) % 40;	//0~9为缩小，10~19为放大
			var angle1 = (index * Math.PI / 20);
			var angle2 = (index + 1) * Math.PI / 20;
			var changeX = 30 * (Math.cos(angle1) - Math.cos(angle2));

			if(index < 10 || index > 29){
				this.chipImg.x += changeX;
				this.chipImg.width -= 2 * changeX;
			}else{
				this.chipImg.x -= changeX;
				this.chipImg.width += 2 * changeX;
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
			if(timer.currentCount != 0){
				timer.reset();
			}
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