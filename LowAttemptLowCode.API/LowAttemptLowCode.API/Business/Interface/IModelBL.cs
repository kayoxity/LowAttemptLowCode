using LowAttemptLowCode.API.Entities.Request;

namespace LowAttemptLowCode.API.Business.Interface
{
    public interface IModelBL
    {
        public Task<string> AddModel(AddModelRequest addModelRequest);
    }
}
