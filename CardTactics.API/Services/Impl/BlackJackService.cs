using CardTactics.API.Models;
using CardTactics.API.Services.Interfaces;

namespace CardTactics.API.Services.Impl
{
    public class BlackJackService : IBlackJackService
    {
        #region public functions
        public BlackJackTable GetBlackJackStartingHand()
        {
            return CheckBlackJackTableWinner(CheckBlackJackTable(new BlackJackTable()));
        }

        public BlackJackTable GetNextCard(BlackJackTable table, string forWho)
        {
            if (nameof(table.Player) == forWho)
                table.Player.Add(new Card());
            if (nameof(table.Croupier) == forWho)
                table.Croupier.Add(new Card());

            table = CheckBlackJackTable(table);
            table = CheckBlackJackTableWinner(table);
            return table;
        }

        #endregion
        #region private functions
        BlackJackTable CheckBlackJackTable(BlackJackTable blackJackTable)
        {
            bool cardSwitched = false;
            for (int i = 0; i < blackJackTable.Player.Count - 1; i++)
            {
                for (int j = 1; j < blackJackTable.Player.Count; j++)
                {
                    if (i != j && blackJackTable.Player[i].Equals(blackJackTable.Player[j]))
                    {
                        blackJackTable.Player[j] = new Card();
                        cardSwitched = true;
                    }
                }
            }
            if (!cardSwitched)
            {
                for (int i = 0; i < blackJackTable.Croupier.Count - 1; i++)
                {
                    for (int j = 1; j < blackJackTable.Croupier.Count; j++)
                    {
                        if (i != j && blackJackTable.Croupier[i].Equals(blackJackTable.Croupier[j]))
                        {
                            blackJackTable.Croupier[j] = new Card();
                            cardSwitched = true;
                        }
                    }
                }
                if (!cardSwitched)
                {
                    for (int i = 0; i < blackJackTable.Player.Count; i++)
                    {
                        for (int j = 0; j < blackJackTable.Croupier.Count; j++)
                        {
                            if (blackJackTable.Player[i].Equals(blackJackTable.Croupier[j]))
                            {
                                blackJackTable.Player[i] = new Card();
                                cardSwitched = true;
                            }
                        }
                    }
                }
            }
            if (cardSwitched)
                blackJackTable = CheckBlackJackTable(blackJackTable);

            return blackJackTable;
        }

        private BlackJackTable CheckBlackJackTableWinner(BlackJackTable blackJackTable)
        {
            blackJackTable.PlayerSum = 0;
            blackJackTable.CroupierSum = 0;

            foreach (var card in blackJackTable.Player)
            {
                blackJackTable.PlayerSum += card.GetCardValue(blackJackTable.PlayerSum);
            }
            foreach (var card in blackJackTable.Croupier)
            {
                blackJackTable.CroupierSum += card.GetCardValue(blackJackTable.CroupierSum);
            }

            if (blackJackTable.CroupierSum > 21 && blackJackTable.Croupier.Any(c => c.Rank == CardRanks.Ace))
                blackJackTable.CroupierSum -= 10;
            if (blackJackTable.PlayerSum > 21 && blackJackTable.Player.Any(c => c.Rank == CardRanks.Ace))
                blackJackTable.PlayerSum -= 10;

            if (blackJackTable.PlayerSum == 21)
                blackJackTable.Winner = Winner.Player;
            else if (blackJackTable.CroupierSum == 21)
                blackJackTable.Winner = Winner.Croupier;
            else if (blackJackTable.PlayerSum > 21)
                blackJackTable.Winner = Winner.Croupier;
            else if (blackJackTable.CroupierSum > 21)
                blackJackTable.Winner = Winner.Player;
            else if (blackJackTable.PlayerSum > blackJackTable.CroupierSum)
                blackJackTable.Winner = Winner.Player;
            else if (blackJackTable.PlayerSum < blackJackTable.CroupierSum)
                blackJackTable.Winner = Winner.Croupier;
            else if (blackJackTable.PlayerSum == blackJackTable.CroupierSum)
                blackJackTable.Winner = Winner.Draw;
            else
                blackJackTable.Winner = Winner.None;

            return blackJackTable;
        }
        #endregion
    }
}
