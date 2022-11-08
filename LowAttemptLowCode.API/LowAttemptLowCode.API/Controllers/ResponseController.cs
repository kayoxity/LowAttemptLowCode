using LowAttemptLowCode.API.Entities.Request;
using LowAttemptLowCode.API.Entities.Response;
using LowAttemptLowCode.API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LowAttemptLowCode.API.Business.Interface;

namespace LowAttemptLowCode.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResponseController : ControllerBase
    {
        private readonly IResponseBL _responseBL;

        public ResponseController(IResponseBL responseBL)
        {
            _responseBL = responseBL;
        }

        [HttpPost(RouteConstants.AddResponse)]
        public async Task<ActionResult<APIResponseModel<string>>> AddResponse(AddResponseRequest addResponseRequest)
        {
            return new APIResponseModel<string>(await _responseBL.AddResponse(addResponseRequest));
        }

        [HttpGet(RouteConstants.GetAllResponsesByModelId)]
        public async Task<ActionResult<APIResponseModel<List<GetAllResponsesByModelIdResponse>>>> GetAllResponsesByModelId(string modelId)
        {
            return new APIResponseModel<List<GetAllResponsesByModelIdResponse>>(await _responseBL.GetAllResponsesByModelId(modelId));
        }

        [HttpGet(RouteConstants.GetResponseByResponseId)]
        public async Task<ActionResult<APIResponseModel<GetResponseByResponseIdResponse>>> GetResponseByResponseId(string responseId)
        {
            return new APIResponseModel<GetResponseByResponseIdResponse>(await _responseBL.GetResponseByResponseId(responseId));
        }
    }
}
