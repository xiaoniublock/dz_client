class CardGroups{
    private _cards:Array<Card>;
    private _cardNum:number;
    public get cardNum() : number {
        return this._cardNum;
    }
   
    public get cards() : Array<Card> {
        return this._cards;
    }
    public set cardNum(cardNum:number) {
       this._cardNum=cardNum;
    }
    public set cards(cards:Array<Card> ){
        this._cards=cards;
    }
}