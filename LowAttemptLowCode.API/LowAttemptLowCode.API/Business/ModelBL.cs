using AutoMapper;
using LowAttemptLowCode.API.Business.Interface;
using LowAttemptLowCode.API.Data.Interfaces;
using LowAttemptLowCode.API.Entities;
using LowAttemptLowCode.API.Entities.MongoDBSchemas;
using LowAttemptLowCode.API.Entities.Request;
using LowAttemptLowCode.API.Helpers;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace LowAttemptLowCode.API.Business
{
    public class ModelBL : IModelBL
    {
        private readonly IMongoDBClient _mongoDBClient;
        private readonly IMapper _mapper;

        public ModelBL(IMongoDBClient mongoDBClient, IMapper mapper)
        {
            _mongoDBClient = mongoDBClient;
            _mapper = mapper;
        }

        public async Task<string> AddModel(AddModelRequest addModelRequest)
        {
            _mongoDBClient.SetDatabaseAndCollection(Constants.LowAttemptLowCode, Constants.Models);

            var modelData = _mapper.Map<ModelSchema>(addModelRequest);
            await _mongoDBClient.InsertAsync(BsonDocument.Parse(JsonConvert.SerializeObject(modelData, Serializers.camelCaseSerializer)));

            return modelData.Id;
        }
    }
}
