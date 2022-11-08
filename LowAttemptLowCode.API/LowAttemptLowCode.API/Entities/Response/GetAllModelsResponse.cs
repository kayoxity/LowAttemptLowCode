using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace LowAttemptLowCode.API.Entities.Response
{
    public class GetAllModelsResponse
    {
        [BsonElement("_id")]
        public string Id { get; set; }
        public string Author { get; set; }
        public string ModelName { get; set; }
        public long ResponseCount { get; set; }
        public DateTime DateModified { get; set; }
    }
}
