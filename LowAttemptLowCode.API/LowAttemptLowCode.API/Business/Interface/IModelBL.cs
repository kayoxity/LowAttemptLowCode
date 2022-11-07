using LowAttemptLowCode.API.Entities.MongoDBSchemas;
using LowAttemptLowCode.API.Entities.Request;

namespace LowAttemptLowCode.API.Business.Interface
{
    public interface IModelBL
    {
        public Task<string> AddModel(AddModelRequest addModelRequest);
        public Task<ModelSchema> GetModel();
    }
}
