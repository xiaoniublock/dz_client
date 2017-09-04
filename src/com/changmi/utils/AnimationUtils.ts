class AnimationUtils
{
    private static _instance:AnimationUtils

    public static getInstance(){
        if(!this._instance){
            this._instance = new AnimationUtils();
        }
        return this._instance;
	}
    //动态加减数字方法——勉强完成
    public changeLabelNumber(label:eui.Label,num:number){
        var nowNum:number = parseInt(label.text);   //现在数字
        var subNum:number = num - nowNum;           //需要改变的差
        var numLength;                              //记录差的位数
        var changeNum;                              //记录一次改变的数字大小
        for(numLength = 1;Math.pow(10,numLength) < Math.abs(subNum) && numLength < 5;numLength++){
        }
        changeNum = 0;
        while(numLength){
            changeNum *= 10;
            changeNum++;    //变成11111格式
            numLength--;
            if(Math.abs(changeNum) > Math.abs(subNum)){
                changeNum = Math.ceil(changeNum / 10);
            }
        }
        if(subNum > 0){
            subNum -= changeNum;
            nowNum += changeNum;
        }else{
            subNum += changeNum;
            nowNum -= changeNum;
        }
        label.text = "" + nowNum;
        if(num != nowNum){
            egret.setTimeout(function(){
                this.changeLabelNumber(label,num);
            }, this, changeNum == 1 ? 100 : 40);
        }
    }
}