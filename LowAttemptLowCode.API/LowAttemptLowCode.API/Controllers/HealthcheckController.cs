using LowAttemptLowCode.API.Entities.Request;
using LowAttemptLowCode.API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LowAttemptLowCode.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthcheckController : ControllerBase
    {
        [HttpGet]
        public async Task<string> Healthcheck()
        {
            return "Hello from Healthcheck controller!";
        }
    }
}
