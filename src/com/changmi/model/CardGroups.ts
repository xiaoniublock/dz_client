class CardGroups {
    private _cards: Array<Card>;
    private _cardNum: number;
    public constructor(cards?: Array<Card>) {
        if(cards)
        this._cards = cards;
    }
    public get cardNum(): number {
        return this._cardNum;
    }
    public set cardNum(cardNum: number) {
        this._cardNum = cardNum;
    }
    public get cards(): Array<Card> {
        return this._cards;
    }
    public set cards(cards: Array<Card>) {
        this._cards = cards;
    }
    public initCards(card:Card){
        if(!this._cards){
            this._cards=[];
        }
         this._cards.push(card);
    }
    public clearCards(){
        this._cards=[];
    }
    /**
     * 合并两个group生成新的group
     */
    public combineCardGroups(cards1: CardGroups, cards2: CardGroups) {
        this.cards = cards1.cards.concat(cards2.cards);
    }
}