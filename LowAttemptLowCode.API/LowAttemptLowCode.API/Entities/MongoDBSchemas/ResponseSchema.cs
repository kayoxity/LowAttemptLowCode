using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace LowAttemptLowCode.API.Entities.MongoDBSchemas
{
    public class ResponseSchema
    {
        [JsonProperty("_id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [BsonElement("modelId")]
        public string ModelId { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("response")]
        public JArray Response { get; set; }
        [BsonElement("dateCreated")]
        public DateTime DateCreated { get; set; } = DateTime.Now;
        [BsonElement("dateModified")]
        public DateTime DateModified { get; set; } = DateTime.Now;
    }
}
