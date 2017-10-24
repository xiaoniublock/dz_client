/**
 * Created by egret 
 */

class TrueLoadingUI extends eui.Group {
    
    constructor(){
        super();
        this.addEventListener( egret.Event.REMOVED_FROM_STAGE, () => {
            if( this.hasEventListener( egret.Event.ENTER_FRAME ) ){
                this.removeEventListener( egret.Event.ENTER_FRAME, this.runLoading, this );
            }
        }, this );
        this.addEventListener( egret.Event.ADDED_TO_STAGE, () => {
            // this.setProgress( 0, 1 );
            this.addEventListener( egret.Event.ENTER_FRAME, this.runLoading, this );
        }, this );
    }

    createChildren():void {
        super.createChildren();
        this._loadingRun = new egret.Bitmap(RES.getRes("loading_run"));
        this.addChild( this._loadingRun );
        this._loadingRun.anchorOffsetX = this._loadingRun.width * .5;
        this._loadingRun.anchorOffsetY = this._loadingRun.height * .5;
        this._loadingRun.x = this.stage.stageWidth * .5;
        this._loadingRun.y = this.stage.stageHeight * .5;
        
        this._txProgress = new egret.TextField;
        this._txProgress.textAlign = egret.HorizontalAlign.CENTER;
        this._txProgress.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txProgress.x = this.stage.stageWidth * .5 - 100;
        this._txProgress.width = 200;
        this._txProgress.y = this.stage.stageHeight * .5 - 100;
        this._txProgress.height = 200;
        this._txProgress.size = 14;
        this._txProgress.stroke = 1;
        this._txProgress.strokeColor = 0;
        this.addChild( this._txProgress );
    }
    
    private runLoading( evt:egret.Event ){
        this._loadingRun.rotation += 5;
    }
    
    private _txProgress: egret.TextField;
    private _loadingRun: egret.Bitmap;

    // public setProgress( itemsLoaded:number, itemsTotal:number ):void {
    //     if( this._txProgress ){
    //         this._txProgress.text = Math.round( itemsLoaded / itemsTotal * 100 ) + "%";
    //     }
    // }
}