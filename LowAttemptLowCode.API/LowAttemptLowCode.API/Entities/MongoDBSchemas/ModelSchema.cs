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
        public string ModelName { get; set; }
        public JObject Model { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime DateModified { get; set; } = DateTime.Now;
    }
}
