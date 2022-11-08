using LowAttemptLowCode.API.Entities.MongoDBSchemas;
using LowAttemptLowCode.API.Entities.Request;
using LowAttemptLowCode.API.Entities.Response;

namespace LowAttemptLowCode.API.Business.Interface
{
    public interface IModelBL
    {
        public Task<string> AddModel(AddModelRequest addModelRequest);
        public Task<bool> UpdateModel(UpdateModelRequest updateModelRequest);
        public Task<ModelSchema> GetModelById(string id);
        public Task<List<GetAllModelsResponse>> GetAllModels();
    }
}
