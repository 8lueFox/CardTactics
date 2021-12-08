using CardTactics.API.Models;
using CardTactics.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CardTactics.API.Controllers
{
    [ApiController]
    public class BlackJackController : ControllerBase
    {
        private readonly ILogger<BlackJackController> _logger;
        private readonly IBlackJackService _service;

        public BlackJackController(ILogger<BlackJackController> logger, IBlackJackService blackJackService)
        {
            _logger = logger;
            _service = blackJackService;
        }

        [HttpGet("GetStartingHand")]
        public BlackJackTable Get()
        {
            return _service.GetBlackJackStartingHand();
        }

        [HttpPost("DrawCardForPlayer")]
        public BlackJackTable GetCardForPlayer(BlackJackTable blackJackTable)
        {
            return _service.GetNextCard(blackJackTable, "Player");
        }

        [HttpPost("DrawCardForCroupier")]
        public BlackJackTable GetCardForCroupier(BlackJackTable blackJackTable)
        {
            return _service.GetNextCard(blackJackTable, "Croupier");
        }
    }
}
