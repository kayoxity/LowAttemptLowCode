using LowAttemptLowCode.API.Helpers;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace LowAttemptLowCode.API.Entities.MongoDBSchemas
{
    [MongoCollection("Models")]
    public class ModelSchema
    {
        [JsonProperty("_id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [BsonElement("modelName")]
        public string ModelName { get; set; }
        [BsonElement("model")]
        public JObject Model { get; set; }
        [BsonElement("author")]
        public string Author { get; set; }
        [BsonElement("responseCount")]
        public long ResponseCount { get; set; }
        [BsonElement("dateCreated")]
        public DateTime DateCreated { get; set; }
        [BsonElement("dateModified")]
        public DateTime DateModified { get; set; } = DateTime.UtcNow;
    }
}
