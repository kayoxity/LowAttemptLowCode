using LowAttemptLowCode.API.Entities.Request;
using LowAttemptLowCode.API.Entities.Response;

namespace LowAttemptLowCode.API.Business.Interface
{
    public interface IResponseBL
    {
        public Task<string> AddResponse(AddResponseRequest addResponseRequest);

        public Task<List<GetAllResponsesByModelIdResponse>> GetAllResponsesByModelId(string modelId);

        public Task<GetResponseByResponseIdResponse> GetResponseByResponseId(string responseId);
    }
}
