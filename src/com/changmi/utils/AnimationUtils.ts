class AnimationUtils {
    private static _instance: AnimationUtils

    public hasMoreAnimation:boolean;
    public animationPool:Array<any> = [];
    public animationTimeArray:Array<number> = [];
    public _publicTimer:egret.Timer;

    public static getInstance() {
        if (!this._instance) {
            this._instance = new AnimationUtils();
        }
        return this._instance;
    }

    public get publicTimer():egret.Timer {
        if (!this._publicTimer) {
            this._publicTimer = new egret.Timer(500, 1);
            this._publicTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeOver, this);
        }
        this._publicTimer.delay = this.animationTimeArray[0];
        return this._publicTimer;
    }

    /**
     * 增加动画方法
     * 参数一：函数名
     * 参数二：参数
     * 参数三：函数环境
     * 参数四：动画持续时间
     */
    public addAnimation(animation:Function, param:Array<any>, thisObj, time:number) {
        this.animationPool.push({callback: animation, param: param, thisObj: thisObj});
        this.animationTimeArray.push(time);
        if (!this.hasMoreAnimation) {
            this.playAnimations();
            this.hasMoreAnimation = true;
        }
    }

    /**
     * 清除动画方法
     */
    public removeAllAnimation() {
        this.animationPool = [];
        this.animationTimeArray = [];
    }

    public playAnimations() {
        let callBack = this.animationPool[0];
        if (callBack) {
            callBack.callback.apply(callBack.thisObj, callBack.param);
        }
        this.publicTimer.start();
    }

    public timeOver() {
        this.animationPool.shift();
        this.animationTimeArray.shift();
        this.publicTimer.reset();
        if (this.animationPool.length == 0) {
            this.hasMoreAnimation = false;
        } else {
            this.playAnimations();
        }
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
            }, this, Math.abs(num) <= 5 ? 150 : 80);
        }
    }


}