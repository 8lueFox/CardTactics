using CardTactics.API.Models;

namespace CardTactics.API.Services.Interfaces
{
    public interface IBlackJackService
    {
        BlackJackTable GetBlackJackStartingHand();
        BlackJackTable GetNextCard(BlackJackTable table, string forWho);
    }
}
