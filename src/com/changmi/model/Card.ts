/**
 * 
 * 举例：四张3点1，2，3，4
 * 同点数排序规则 红黑梅方
 * 需要提供一个将序号转为点数的方法，用来对比是否是同点数
*/
class Card extends eui.Image
{
    public constructor(index:number,color:number){
        super();
        this.createCardSource(index,color);
    }
    /**扑克序号,2-14,最小的是2，最大的是A*/
    public _index : number;
    /**扑克花色，1：黑 2:红，3：花，4：方片 */
    public _color:number;
    
    public get index() : number {
        return this._index;
    }
   
    public get color() : number {
        return this._color;
    }
   
    public createCardSource(index:number,color:number){
        this._index=index;
        this._color=color;
        this.width=78;
        this.height=117;
        this.source = "board_"+this._color + "."+this._color+""+(this._index<10?("0"+this._index):this._index);
    }

    
}