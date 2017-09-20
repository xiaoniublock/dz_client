class StageUtils {
    private  _stageWidth: number = 0;
    private  _stageHeight: number = 0;
    private static _instance: StageUtils;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new StageUtils();
        }
        return this._instance;
    }
    public  getStageWidth(): number {
        if (this._stageWidth == 0) {
            this._stageWidth = egret.MainContext.instance.stage.stageWidth;
        }
        return this._stageWidth;
    }
    public  getStageHeight(): number {
        if (this._stageHeight == 0) {
            this._stageHeight = egret.MainContext.instance.stage.stageHeight;
        }
        return this._stageHeight;
    }
    public  getStage():egret.Stage{
        return egret.MainContext.instance.stage;
    }
}