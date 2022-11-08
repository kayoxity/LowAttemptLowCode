using AutoMapper;
using LowAttemptLowCode.API.Business.Interface;
using LowAttemptLowCode.API.Data.Interfaces;
using LowAttemptLowCode.API.Entities;
using LowAttemptLowCode.API.Entities.MongoDBSchemas;
using LowAttemptLowCode.API.Entities.Request;
using LowAttemptLowCode.API.Entities.Response;
using LowAttemptLowCode.API.Helpers;
using MongoDB.Bson;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace LowAttemptLowCode.API.Business
{
    public class ResponseBL : IResponseBL
    {
        private readonly IMongoDBClient _mongoDBClient;
        private readonly IMapper _mapper;

        private MongoDB.Bson.IO.JsonWriterSettings _jsonWriterSettings = new MongoDB.Bson.IO.JsonWriterSettings { OutputMode = MongoDB.Bson.IO.JsonOutputMode.Strict };

        public ResponseBL(IMongoDBClient mongoDBClient, IMapper mapper)
        {
            _mongoDBClient = mongoDBClient;
            _mapper = mapper;
        }

        public async Task<string> AddResponse(AddResponseRequest addResponseRequest)
        {
            _mongoDBClient.SetDatabaseAndCollection(Constants.LowAttemptLowCode, Constants.Responses);

            var responseData = _mapper.Map<ResponseSchema>(addResponseRequest);
            await _mongoDBClient.InsertAsync(BsonDocument.Parse(JsonConvert.SerializeObject(responseData, Serializers.camelCaseSerializer)));

            _mongoDBClient.SetDatabaseAndCollection(Constants.LowAttemptLowCode, Constants.Models);
            await _mongoDBClient.IncrementResponseAsync(addResponseRequest.ModelId);

            return responseData.Id;
        }

        public async Task<List<GetAllResponsesByModelIdResponse>> GetAllResponsesByModelId(string modelId)
        {
            _mongoDBClient.SetDatabaseAndCollection(Constants.LowAttemptLowCode, Constants.Responses);

            var responses = await _mongoDBClient.GetAllResponsesByModelId(modelId);
            var getAllModelsResponses = responses.Select(x => JsonConvert.DeserializeObject<GetAllResponsesByModelIdResponse>(x.ToJson().Replace("_id", "Id"))).ToList();

            return getAllModelsResponses;
        }

        public async Task<GetResponseByResponseIdResponse> GetResponseByResponseId(string responseId)
        {
            _mongoDBClient.SetDatabaseAndCollection(Constants.LowAttemptLowCode, Constants.Responses);

            var responseDocument = await _mongoDBClient.GetByIdAsync(responseId);
            var responseData = JsonConvert.DeserializeObject<ResponseSchema>(responseDocument.ToJson());

            var modelId = responseData.ModelId;

            _mongoDBClient.SetDatabaseAndCollection(Constants.LowAttemptLowCode, Constants.Models);

            var modelDocument = await _mongoDBClient.GetByIdAsync(modelId);
            var modelData = JsonConvert.DeserializeObject<ModelSchema>(modelDocument.ToJson(_jsonWriterSettings));

            var validInputEntities = new List<InputEntity>();
            var inputs = (JArray)modelData.Model["inputs"];

            foreach (JObject input in inputs)
            {
                InputEntity inputEntity = new InputEntity()
                {
                    Name = input["name"].ToObject<string>(),
                    Type = input["type"].ToObject<string>(),
                    Label = input["label"].ToObject<string>(),
                    Values = input["values"]?.ToObject<List<string>>(),
                    Required = input["validators"]["required"]?.ToObject<string>()
                };
                validInputEntities.Add(inputEntity);
            }

            GetResponseByResponseIdResponse getResponseByResponseIdResponse = new GetResponseByResponseIdResponse()
            {
                Id = responseId,
                Name= responseData.Name,
                Responses = new List<Response>()
            };

            var responseDataResponses = responseData.Response;
            foreach(var response in responseDataResponses)
            {
                var validInputEntity = validInputEntities.Where(x => x.Name == response["InputName"].ToObject<string>()).FirstOrDefault();
                if (validInputEntity != null)
                {
                    Response inputResponse = new Response()
                    {
                        Label = validInputEntity.Label,
                        Value = response["Value"].ToObject<string>(),
                        Values = response["Values"].ToObject<List<string>>(),
                        Type = validInputEntity.Type,
                        AllValues = validInputEntity.Values,
                        Required = validInputEntity.Required
                    };

                    getResponseByResponseIdResponse.Responses.Add(inputResponse);
                }
            }

            return getResponseByResponseIdResponse;
        }

    }
}
