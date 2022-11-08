using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace LowAttemptLowCode.API.Entities.Request
{
    public class UpdateModelRequest
    {
        public string Id { get; set; }
        public string ModelName { get; set; }
        public JObject Model { get; set; }
        public long ResponseCount { get; set; }
        public string Author { get; set; }
    }
}
