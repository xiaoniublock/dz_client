class AnimationUtils {
    private static _instance: AnimationUtils

    public static getInstance() {
        if (!this._instance) {
            this._instance = new AnimationUtils();
        }
        return this._instance;
    }
    //动态加减数字方法——勉强完成
    //参数1：需要改变的文本
    //参数2：需要改变的数值，如-500即文本数字减少500
    public changeLabelNumber(label: eui.Label, num: number) {
        if (!num) {
            return;
        }
        var nowNum: number = parseInt(label.text);   //现在数字
        var numLength;                              //记录差的位数
        var changeNum;                              //记录一次改变的数字大小
        for (numLength = 1; Math.pow(10, numLength) < Math.abs(num) && numLength < 5; numLength++) {
        }
        changeNum = 0;
        while (numLength) {
            changeNum *= 10;
            changeNum++;    //变成11111格式
            numLength--;
            if (Math.abs(changeNum) > Math.abs(num)) {
                changeNum = Math.ceil(changeNum / 10);
            }
        }
        if (num > 0) {
            num -= changeNum;
            nowNum += changeNum;
        } else {
            num += changeNum;
            nowNum -= changeNum;
        }
        label.text = "" + nowNum;
        if (num) {
            egret.setTimeout(function () {
                this.changeLabelNumber(label, num);
            }, this, Math.abs(num) <= 5 ? 250 : 80);
        }
    }


}