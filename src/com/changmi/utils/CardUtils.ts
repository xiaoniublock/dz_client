class CardUtils {
    private static _instance: CardUtils
    /**存取公共牌 */
    private publicCards: Array<Card> = [];
    public static getInstance() {
        if (!this._instance) {
            this._instance = new CardUtils();
        }
        return this._instance;
    }
    /**一次性添加多张公共牌 */
    public putPublicCards(cardNumbers: Array<number>) {
        var cards:Array<Card> = [];
        for(var i = 0;i < cardNumbers.length;i++){
            var card:Card = new Card(cardNumbers[i] % 100,parseInt("" + cardNumbers[i] / 100));
            cards.push(card);
        }
        this.publicCards = cards;
    }
    public getPublicCards():Array<Card>{
        return this.publicCards;
    }
    public getPublicCard(index:number):Card{
        return this.publicCards[index];
    }
    /**逐一添加公共牌 */
    public addPublicCard(cardNumber: number) {
        var card:Card = new Card(cardNumber % 100,parseInt("" + cardNumber / 100));
        this.publicCards.push(card);
    }
    /**清空公共牌 */
    public clearPublicCards() {
        this.publicCards.splice(0, this.publicCards.length);
    }
    /**从7张牌中选5张，形成多种组合 */
    public SevenToFiveGroups(cards: Array<Card>): Array<Array<Card>> {
        let group: Array<Array<Card>> = [];
        let cardnum = cards.length;
        for (let a = 0; a < cardnum - 4; a++) {
            for (let b = a + 1; b < cardnum - 3; b++) {
                for (let c = b + 1; c < cardnum - 2; c++) {
                    for (let d = c + 1; d < cardnum - 1; d++) {
                        for (let e = d + 1; e < cardnum; e++) {
                            let pukeGroup: Array<Card> = [];
                            pukeGroup.push(cards[a]);
                            pukeGroup.push(cards[b]);
                            pukeGroup.push(cards[c]);
                            pukeGroup.push(cards[d]);
                            pukeGroup.push(cards[e]);
                            group.push(pukeGroup);
                            // console.log(pukeGroup[0].index+" "+pukeGroup[1].index+" "+pukeGroup[2].index+" "+pukeGroup[3].index+" "+pukeGroup[4].index+" ")
                        }
                    }
                }
            }
        }
        return group;
    }

    /**计算牌组的类型Card_Type */
    public calCardType(cards: Array<Card>): number {
        cards.sort(function (a, b) { return a.index - b.index });
        let flag = 0;
        let isTonghua = 0;
        let isShunzi = 0;
        let cardType: number = CARD_TYPE.unknown;
        /**判断重复牌数 */
        for (let i: number = 0; i < cards.length; i++) {
            for (let j: number = i + 1; j < cards.length; j++) {
                if (cards[i].index == cards[j].index) {
                    flag++;
                }

            }
            if (i < cards.length - 1 && cards[i].color == cards[i + 1].color) {
                isTonghua++;
            }
            if (i < cards.length - 1 && cards[i].index == cards[i + 1].index - 1) {
                isShunzi++;
            }

        }
        if (isTonghua == 4 && isShunzi != 4) {
            flag = 7;
        } else if (isTonghua != 4 && isShunzi == 4) {
            flag = 8;
        }
        else if (isTonghua == 4 && isShunzi == 4 && (cards[4].index == 14 && cards[0].index != 10)) {
            flag = 9;
        }
        else if (isTonghua == 4 && isShunzi == 4 && (cards[4].index == 14 && cards[0].index == 10)) {
            flag = 10;
        }
        switch (flag) {
            case 10:
                cardType = CARD_TYPE.Royal_Flush;
                break;
            case 9:
                cardType = CARD_TYPE.Straight_Flush;
                break;
            case 8:
                cardType = CARD_TYPE.Straight;
                break;
            case 7:
                cardType = CARD_TYPE.Flush;
                break;
            case 6:
                cardType = CARD_TYPE.Four_of_a_Kind;
                break;
            case 4:
                cardType = CARD_TYPE.Fullhouse;
                break;
            case 3:
                cardType = CARD_TYPE.Three_of_a_kind;
                break;
            case 2:
                cardType = CARD_TYPE.Two_Pairs;
                break;
            case 1:
                cardType = CARD_TYPE.One_Pair;
                break;
            case 0:
                cardType = CARD_TYPE.high_card;
                break;
        }


        return cardType;
    }
    /**第一张牌放到最后*/
    public transFirstCardTolast(card: Array<Card>): Array<Card> {
        let tmp = card[0];
        for (let i = 0; i < card.length - 1; i++) {
            card[i] = card[i + 1];
        }
        card[card.length - 1] = tmp;
        return card;
    }
    /**获取多次出现的牌点数 */
    public calMaxShowNum(cards: Array<Card>): Array<number> {
        let tmp: Array<number> = [];
        for (let i: number = 0; i < cards.length; i++) {
            for (let j: number = i + 1; j < cards.length; j++) {
                if (cards[i].index == cards[j].index) {
                    if (tmp.indexOf(cards[i].index) == -1) {
                        tmp.push(cards[i].index);
                    }
                }

            }
        }
        return tmp;
    }
    public transPairToFirst(card: Array<Card>): Array<Card> {
        let temp = this.calMaxShowNum(card);
        let tmpA: Array<Card> = [];
        let tmpB: Array<Card> = [];
        for (let i = 0; i < card.length; i++) {
            if (card[i].index != temp[0]) {
                tmpA.push(card[i]);
            } else {
                tmpB.push(card[i]);
            }
        }
        for (let i = 0; i < tmpA.length; i++) {
            tmpB.push(tmpA[i]);
        }
        return tmpB;
    }
    /**计算牌组类型Long值 */
    public calCardToLong(cardType: number, card: Array<Card>): number {
        card.sort(function (a, b) { return b.index - a.index });
        //  console.log(card[0].index+" "+card[1].index+" "+card[2].index+" "+card[3].index+" "+card[4].index+" ")
        switch (cardType) {
            case CARD_TYPE.Straight_Flush:
                break;
            case CARD_TYPE.Straight:
                if (card[0].index == 14 && card[4].index == 2) {
                    //A,2,3,4,5是最小的顺子
                    card = this.transFirstCardTolast(card);
                }
                break;
            case CARD_TYPE.Royal_Flush:
                break;
            case CARD_TYPE.Flush:
                break;
            case CARD_TYPE.high_card:
                break;

            case CARD_TYPE.Four_of_a_Kind:
                //把四条放前面
                if (card[0].index != card[1].index) {
                    card = this.transFirstCardTolast(card);
                }
                break;
            case CARD_TYPE.Fullhouse:
                //把三条放前面，一对放后面
                if (card[0].index == card[1].index && card[1].index != card[2].index) {
                    let tmpA: Card = card[0];
                    let tmpB: Card = card[1];
                    for (let i = 0; i < card.length - 2; i++) {
                        card[i] = card[i + 2];
                    }
                    card[3] = tmpA;
                    card[4] = tmpB;
                }
                break;
            case CARD_TYPE.Three_of_a_kind:
            //把三条放前面
            case CARD_TYPE.One_Pair:
                //把一对放在最前面
                card = this.transPairToFirst(card);
                break;
            case CARD_TYPE.Two_Pairs:
                //把两对放前面且大的对子在最前面，小的对子在后面
                if (card[0].index != card[1].index) {
                    card = this.transFirstCardTolast(card);
                } else if (card[1].index != card[2].index && card[2].index != card[3].index) {
                    let tmp: Card = card[2];
                    for (let i = 2; i < card.length - 1; i++) {
                        card[i] = card[i + 1];
                    }
                    card[card.length - 1] = tmp;
                }
                break;

            default:
                break;
        }
        return this.getLong(cardType, card);
    }
    public getLong(cardType: number, card: Array<Card>): number {
        let lon = 1000000000 * 10;
        let pkValue = 0;
        for (let i = 0; i < card.length; i++) {
            let interval = 1;
            for (let j = i; j < card.length - 1; j++) {
                interval *= 10;
                interval *= 10;
            }
            pkValue += card[i].index * interval;
        }
        pkValue += cardType * lon;
        return pkValue;
    }
    /**根据输入的牌组输出最佳牌组 */
    public getMaxCardsFromSevenCards(cards: Array<Card>): CardGroups {
        let group: Array<Array<Card>> = this.SevenToFiveGroups(cards);
        let maxCardNum = 0;
        let maxCardType = 0;
        let tmp = 0;
        let maxCards: Array<Card>;
        for (let i = 0; i < group.length; i++) {
            let cardType = this.calCardType(group[i]);
            tmp = this.calCardToLong(cardType, group[i]);
            //  console.log(tmp);
            //  console.log("cardType   "+cardType);
            if (maxCardNum < tmp) {
                maxCards = group[i];
                maxCardNum = tmp;
            }
        }
        let cardGroups: CardGroups = new CardGroups(maxCards);
        cardGroups.cardNum = maxCardNum;
        // console.log("max           "+maxCardNum);
        return cardGroups;
    }

}
/**
 * 牌型
*/
class CARD_TYPE {    //各种牌型的组合
    public static unknown = -1; //未知
    public static Royal_Flush = 10; //黑桃10-A
    public static Straight_Flush = 9; //同花顺
    public static Four_of_a_Kind = 8; //四条
    public static Fullhouse = 7; //三条加一对
    public static Flush = 6; //同花
    public static Straight = 5;//顺子
    public static Three_of_a_kind = 4;//三条
    public static Two_Pairs = 3; //两对
    public static One_Pair = 2; //一对
    public static high_card = 1; //高牌，一张最大的

}
/**胜负判定 */
class CARD_RESULT {
    public static Victory = 1; //大
    public static Defeated = 2;//小
    public static Draw = 3//平
    public static unknown = -1; //未知
}