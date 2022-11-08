using AutoMapper;
using LowAttemptLowCode.API.Business;
using LowAttemptLowCode.API.Business.Interface;
using LowAttemptLowCode.API.Data.Interfaces;
using LowAttemptLowCode.API.Entities;
using LowAttemptLowCode.API.Entities.MongoDBSchemas;
using LowAttemptLowCode.API.Entities.Request;
using LowAttemptLowCode.API.Entities.Response;
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
        public async Task<ActionResult<APIResponseModel<string>>> AddModel(AddModelRequest addModelRequest)
        {
            var addModelResponse = await _modelBL.AddModel(addModelRequest);
            return new APIResponseModel<string>(addModelResponse);
        }

        [HttpPost(RouteConstants.AddJsonModel)]
        public async Task<ActionResult<APIResponseModel<string>>> AddJsonModel(AddJsonModelRequest addJsonModelRequest)
        {
            var addJsonModelResponse = await _modelBL.AddJsonModel(addJsonModelRequest);
            return new APIResponseModel<string>(addJsonModelResponse);
        }

        [HttpPost(RouteConstants.UpdateModel)]
        public async Task<ActionResult<bool>> UpdateModel(UpdateModelRequest updateModelRequest)
        {
            return await _modelBL.UpdateModel(updateModelRequest);
        }

        [HttpGet(RouteConstants.GetModelById)]
        public async Task<ActionResult<APIResponseModel<ModelSchema>>> GetModel(string id)
        {
            var modelData = await _modelBL.GetModelById(id);
            return new APIResponseModel<ModelSchema>(modelData);
        }

        [HttpGet(RouteConstants.GetAllModels)]
        public async Task<ActionResult<APIResponseModel<List<GetAllModelsResponse>>>> GetAllModels()
        {
            var modelDatas = await _modelBL.GetAllModels();
            return new APIResponseModel<List<GetAllModelsResponse>>(modelDatas);
        }
    }
}