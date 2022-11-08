using System.Reflection.Metadata;
using System.Xml.Linq;
using AutoMapper;
using LowAttemptLowCode.API.Business.Interface;
using LowAttemptLowCode.API.Data.Interfaces;
using LowAttemptLowCode.API.Entities;
using LowAttemptLowCode.API.Entities.MongoDBSchemas;
using LowAttemptLowCode.API.Entities.Request;
using LowAttemptLowCode.API.Entities.Response;
using LowAttemptLowCode.API.Helpers;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using Newtonsoft.Json;

namespace LowAttemptLowCode.API.Business
{
    public class ModelBL : IModelBL
    {
        private readonly IMongoDBClient _mongoDBClient;
        private readonly IMapper _mapper;

        private JsonWriterSettings _jsonWriterSettings = new JsonWriterSettings { OutputMode = JsonOutputMode.Strict };

        public ModelBL(IMongoDBClient mongoDBClient, IMapper mapper)
        {
            _mongoDBClient = mongoDBClient;
            _mapper = mapper;
        }

        public async Task<string> AddModel(AddModelRequest addModelRequest)
        {
            _mongoDBClient.SetDatabaseAndCollection(Constants.LowAttemptLowCode, Constants.Models);

            var modelData = _mapper.Map<ModelSchema>(addModelRequest);
            modelData.DateCreated = DateTime.UtcNow;
            await _mongoDBClient.InsertAsync(BsonDocument.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(modelData, Serializers.camelCaseSerializer)));

            return modelData.Id;
        }

        public async Task<string> AddJsonModel(AddJsonModelRequest addJsonModelRequest)
        {
            _mongoDBClient.SetDatabaseAndCollection(Constants.LowAttemptLowCode, Constants.Models);

            ModelSchema modelData = Newtonsoft.Json.JsonConvert.DeserializeObject<ModelSchema>(addJsonModelRequest.Data);
            modelData.Id = Guid.NewGuid().ToString();
            modelData.DateCreated = DateTime.UtcNow;

            await _mongoDBClient.InsertAsync(BsonDocument.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(modelData, Serializers.camelCaseSerializer)));

            return modelData.Id;
        }

        public async Task<bool> UpdateModel(UpdateModelRequest updateModelRequest)
        {
            _mongoDBClient.SetDatabaseAndCollection(Constants.LowAttemptLowCode, Constants.Models);

            var modelData = _mapper.Map<ModelSchema>(updateModelRequest);
            await _mongoDBClient.UpdateAsync(BsonDocument.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(modelData, Serializers.camelCaseSerializer)), modelData.Id);

            return true;
        }

        public async Task<ModelSchema> GetModelById(string id)
        {
            _mongoDBClient.SetDatabaseAndCollection(Constants.LowAttemptLowCode, Constants.Models);

            var document = await _mongoDBClient.GetByIdAsync(id);
            var modelSchema = Newtonsoft.Json.JsonConvert.DeserializeObject<ModelSchema>(document.ToJson(_jsonWriterSettings));

            return modelSchema;
        }

        public async Task<List<GetAllModelsResponse>> GetAllModels()
        {
            _mongoDBClient.SetDatabaseAndCollection(Constants.LowAttemptLowCode, Constants.Models);

            var documentList = await _mongoDBClient.GetAllAsync();
            
            var getAllModelsResponses = documentList.Select(x => Newtonsoft.Json.JsonConvert.DeserializeObject<GetAllModelsResponse>(x.ToJson(_jsonWriterSettings).Replace("_id","Id"))).ToList();

            return getAllModelsResponses;
        }
    }
}
