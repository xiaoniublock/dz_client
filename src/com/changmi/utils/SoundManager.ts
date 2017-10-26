/**
* 声音管理器
* @author nodep
* @version 1.1
*/
class SoundManager {

    private static _ins: SoundManager;
    private _nowBg: string = "";
    private _bgC: egret.SoundChannel;
    private _durTDic: CustomMap = new CustomMap();
    private _soundDic: CustomMap = new CustomMap();
    private _soundMap: CustomMap = new CustomMap();

    public constructor() {
    }

    public static getIns(): SoundManager {
        if (SoundManager._ins == null)
            SoundManager._ins = new SoundManager();
        return SoundManager._ins;
    }

    /**
    * 播放背景音乐
    * @param {string} mp3 xxx_mp3
    * @param {number=0} times 播放次数,默认循环
    */
    public playBg(mp3: string, times: number = 0): void {
        if (this._nowBg == mp3)
            return;
        this._nowBg = mp3;
        if (this._bgC) {
            egret.Tween.removeTweens(this._bgC);
            try {
                this._bgC.stop();
            } catch (e) {

            }
        }
        var sd: egret.Sound = RES.getRes(mp3);
        if (!sd)
            return;
        this._bgC = sd.play(0, times);
        if (this._bgC == null)
            return;
        this._bgC.volume = 0;
        egret.Tween.get(this._bgC).to({ volume: 0.5 }, 3000);
    }

    public stopBg() {
        if (this._bgC) {
            egret.Tween.removeTweens(this._bgC);
            this._nowBg = "";
            try {
                this._bgC.stop();

            } catch (e) {

            }
        }
    }

    /**
    * 循环播放音效
    * @param {string} mp3 xxx_mp3
    * @param {number=1} toV
    */
    public playSoundLoop(mp3: string, toV: number = 1): void {
        if (this._soundDic.get(mp3) != null)
            return;
        var sd: egret.Sound = RES.getRes(mp3);
        if (!sd)
            return;
        var cc: egret.SoundChannel = sd.play(0, 0);
        if (cc == null)
            return;
        cc.volume = toV;
        this._soundDic.add(mp3, cc);
    }

    /**
    * 停止循环音效的播放
    * @param {string} mp3
    */
    public stopSoundLoop(mp3: string): void {
        if (this._soundDic.get(mp3) == null)
            return;
        var cc: egret.SoundChannel = this._soundDic.get(mp3);
        cc.stop();
        this._soundDic.del(mp3);
    }

    /**
    * 播放音效
    * @param {string} mp3 音效名称 xxx_mp3
    * @param {number=1} toV 音效大小
    * @param {number=0} durT 多长时间以内不能再次播放次音效
    */
    public playSound(mp3: string, toV: number = 1, durT: number = 0): void {
        if (durT > 0) {
            if (this._durTDic.get(mp3) == null)
                this._durTDic.add(mp3, 0);
            var t: number = new Date().getTime();
            if (t - this._durTDic.get(mp3) < durT)
                return;
            this._durTDic.add(mp3, t);
        }
        if(this._soundMap.get(mp3)!=null){
            (<egret.Sound>this._soundMap.get(mp3)).play(0,1).volume=toV;
        }else{
        var sd: egret.Sound = RES.getRes(mp3);
        if (!sd)
            return;
        var cc: egret.SoundChannel = sd.play(0, 1);
        if (cc == null)
            return;
        cc.volume = toV;
        this._soundMap.add(mp3,sd);
        }
    }

    /**
    * 设置背景音乐音量
    */
    public setBGMValume(volume: number): void {
        if (this._bgC) {
            try {
                this._bgC.volume = volume;
            } catch (e) {
                egret.log(`背景音乐音量设置失败`)
            }
        }
    }
    /**
     * 得到背景音乐音量
     */
    public getBGMValue(): number {
        return this._bgC.volume;
    }

}