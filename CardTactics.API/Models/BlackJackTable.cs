namespace CardTactics.API.Models
{
    public class BlackJackTable
    {
        public List<Card> Player { get; set; }
        public List<Card> Croupier { get; set; }
        public Winner Winner { get; set; }
        public int PlayerSum { get; set; }
        public int CroupierSum { get; set; }

        public BlackJackTable()
        {
            Winner = Winner.None;
            Player = new List<Card>
            {
                new Card(),
                new Card()
            };
            Croupier = new List<Card>
            {
                new Card(),
                new Card()
            };
            PlayerSum = 0;
            CroupierSum = 0;
        }
    }

    public enum Winner
    {
        None,
        Croupier,
        Player,
        Draw
    }
}
