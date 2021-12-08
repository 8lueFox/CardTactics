using System.Security.Cryptography;

namespace CardTactics.API.Models
{
    public class Card
    {
        public CardRanks Rank { get; set; }
        public CardFigures Figure { get; set; }

        public Card(CardRanks cardRank, CardFigures cardFigure)
        {
            Rank = cardRank;
            Figure = cardFigure;
        }
        public Card()
        {
            var x = RandomNumberGenerator.GetInt32(2, 15);
            Rank = (CardRanks)Enum.ToObject(typeof(CardRanks), x);
            x = RandomNumberGenerator.GetInt32(0, 4);
            Figure = (CardFigures)Enum.ToObject(typeof(CardFigures), x);
        }

        public int GetCardValue(int cardsSum)
        {
            if ((int)Rank <= 10)
            {
                return (int)Rank;
            }
            else if ((int)Rank == 11 || (int)Rank == 12 || (int)Rank == 13)
            {
                return 10;
            }
            else
            {
                if (cardsSum + 11 > 21)
                {
                    return 1;
                }
                else
                {
                    return 11;
                }
            }
        }

        public override bool Equals(object? obj)
        {
            if(obj == null)
                return false;
            if (!(obj is Card))
                return false;
            Card card = (Card)obj;
            if (Rank == card.Rank && Figure == card.Figure)
                return true;
            return false;
        }

        public override int GetHashCode()
        {
            return (Rank + " " + Figure).GetHashCode();
        }
    }

    public enum CardFigures
    {
        Clubs = 0,
        Diamonds = 1,
        Hearts = 2,
        Spades = 3
    }

    public enum CardRanks
    {
        Two = 2,
        Three = 3,
        Four = 4,
        Five = 5,
        Six = 6,
        Seven = 7,
        Eight = 8,
        Nine = 9,   
        Ten = 10,  
        Jack = 11, 
        Queen = 12, 
        King = 13, 
        Ace = 14
    }
}
