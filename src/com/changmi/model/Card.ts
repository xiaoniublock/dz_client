/**
 * 
 * 举例：四张3点1，2，3，4
 * 同点数排序规则 红黑梅方
 * 需要提供一个将序号转为点数的方法，用来对比是否是同点数
*/
class Card extends eui.Image {
    public constructor(index: number, color: number) {
        super();
        this.createCardSource(index, color);
    }
    /**扑克序号,2-14,最小的是2，最大的是A*/
    public _index: number;
    /**扑克花色，1：黑 2:红，3：花，4：方片 */
    public _color: number;
    /**是否高亮，true为高亮 */
    public _isHeightLight: boolean = true;

    private playCount: number = 0;

    public get index(): number {
        return this._index;
    }

    public get color(): number {
        return this._color;
    }

    public get isHeightLight(): boolean {
        return this._isHeightLight;
    }

    public set index(index: number) {
        this._index = index;
    }

    public set color(color: number) {
        this._color = color;
    }

    public set isHeightLight(isHeightLight: boolean){
        this._isHeightLight = isHeightLight;
        var index:number = isHeightLight ? 1 : 0.5;
        var colorMatrix = [
			index, 0, 0, 0, 0,
			0, index, 0, 0, 0,
			0, 0, index, 0, 0,
			0, 0, 0, 1, 0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		this.filters = [colorFlilter];
    }

    public isSameAs(card:number) : boolean{
        return (this.index == card % 100) && (this.color == parseInt("" + card / 100)) ? true : false;
    }

    public createCardSource(index: number, color: number) {
        this._index = index;
        this._color = color;
        this.source = "board_" + this._color + "." + this._color + "" + (this._index < 10 ? ("0" + this._index) : this._index);
    }

    public createCardSourceNoPram() {
        this.source = "board_" + this._color + "." + this._color + "" + (this._index < 10 ? ("0" + this._index) : this._index);
    }

    public startrotateAndChangeSource() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.rotate, this);
    }
    public stoprotate() {
        this.playCount = 0;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.rotate, this)
    }

    private rotate(): void {
        var speed = 40;     //旋转速度，数字越小速度越快
        var index = this.playCount % speed;
        var angle1 = index * Math.PI / (speed / 2);
        var angle2 = (index + 1) * Math.PI / (speed / 2);
        var changeX = 39 * (Math.cos(angle1) - Math.cos(angle2));

        if (this.playCount == speed) {
            this.stoprotate();
            this.createCardSourceNoPram();
            return;
        }
        if (index < speed / 4 || index > speed * 3 / 4 - 1) {
            this.width -= 2 * changeX;
            this.x += changeX;
        } else {
            this.width += 2 * changeX;
            this.x -= changeX;
        }
        this.playCount++;
    }
}