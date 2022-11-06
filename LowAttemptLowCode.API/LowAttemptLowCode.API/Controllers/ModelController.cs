using AutoMapper;
using LowAttemptLowCode.API.Business;
using LowAttemptLowCode.API.Business.Interface;
using LowAttemptLowCode.API.Data.Interfaces;
using LowAttemptLowCode.API.Entities;
using LowAttemptLowCode.API.Entities.MongoDBSchemas;
using LowAttemptLowCode.API.Entities.Request;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace LowAttemptLowCode.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModelController : ControllerBase
    {
        private readonly ILogger<ModelController> _logger;
        private readonly IModelBL _modelBL;

        public ModelController(ILogger<ModelController> logger, IModelBL modelBL)
        {
            _logger = logger;
            _modelBL = modelBL;
        }

        [HttpPost(RouteConstants.AddModel)]
        public async Task<ActionResult<string>> AddModel(AddModelRequest addModelRequest)
        {
            return await _modelBL.AddModel(addModelRequest);
        }
    }
}